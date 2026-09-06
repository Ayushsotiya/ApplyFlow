
const bcrypt = require("bcryptjs");
const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const otpGenerator = require('otp-generator');
const mailSender = require('../utils/mailSender');
exports.Signup = async (req, res) => {
    try {
        const { name, email, password, otp } = req.body;

        if (!name || !email || !password || !otp) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const existingUser = await pool.query("SELECT id FROM users WHERE EMAIL = $1", [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }
        const otpResult = await pool.query(
            `SELECT *
             FROM otp
             WHERE email = $1
               AND otp = $2
               AND expires_at > CURRENT_TIMESTAMP
             ORDER BY created_at DESC
             LIMIT 1`,
            [email, otp]
        );
        if (otpResult.rows.length === 0) {
            return res.status(400).json({
                success: false, message: "OTP is not valid"
            });
        }
        const profile_image = `https://api.dicebear.com/5.x/initials/svg?seed=${name}`
        const hashedPassword = await bcrypt.hash(password, 10);
        const userResult = await pool.query(
            `INSERT INTO users (name, email, password, profile_image) 
            VALUES ($1, $2, $3, $4) 
            RETURNING id, name, email, created_at, profile_image`,
            [name, email, hashedPassword, profile_image]
        );
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: userResult.rows[0]
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User cannot be registered please try again ",
        });
    }
}




exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Find user
        const result = await pool.query(
            `SELECT id, name, email, password, profile_image
             FROM users
             WHERE email = $1`,
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const user = result.rows[0];

        // Compare password
        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        );

        // Don't send password to frontend
        user.password = undefined;

        const options = {
            expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }
        res.cookie('token', token, options).status(200).json({
            success: true,
            token,
            user,
            message: `User Login Success`,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Login failed. Please try again"
        });
    }
};


exports.sendotp = async (req, res) => {
    try {
        // Fetch email from request body
        const { email } = req.body;

        // Check email
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        // Check if user already exists
        const checkUserPresent = await pool.query(
            "SELECT id FROM users WHERE email = $1",
            [email]
        );

        // If user already exists
        if (checkUserPresent.rows.length > 0) {
            return res.status(401).json({
                success: false,
                message: "User is Already Registered",
            });
        }

        // Generate 6-digit OTP
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        console.log("OTP Generated:", otp);

        // Check if this OTP already exists
        let checkOtp = await pool.query(
            "SELECT id FROM otp WHERE otp = $1",
            [otp]
        );

        // Generate another OTP if duplicate
        while (checkOtp.rows.length > 0) {
            otp = otpGenerator.generate(6, {
                upperCaseAlpahbets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });

            checkOtp = await pool.query(
                "SELECT id FROM otp WHERE otp = $1",
                [otp]
            );
        }
        mailSender(email, "Verification code from ApplyFlow", `<h1>Your OTP is :</h1><p>${otp}</p>`, "ad");
        // Save OTP in database
        const otpResult = await pool.query(
            `INSERT INTO otp (email, otp)
             VALUES ($1, $2)
             RETURNING *`,
            [email, otp]
        );

        console.log("OTP Body:", otpResult.rows[0]);

        // Return response
        return res.status(200).json({
            success: true,
            message: "OTP Sent Successfully",
            otp,
        });

    } catch (error) {
        console.error(error.message);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};