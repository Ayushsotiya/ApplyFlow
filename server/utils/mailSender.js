const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,

            connectionTimeout: 10000,
            greetingTimeout: 10000,
            socketTimeout: 10000,

            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        const info = await transporter.sendMail({
            from: `"ApplyFlow - by Ayush" <${process.env.MAIL_USER}>`,
            to: email,
            subject: title,
            html: body,
        });

        console.log("Email sent:", info.messageId);

        return info;

    } catch (error) {
        console.log("SMTP ERROR:", error);
        throw error;
    }
};

module.exports = mailSender;