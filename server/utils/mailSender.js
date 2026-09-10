const nodemailer = require("nodemailer");
require('dotenv').config();
const mailSender = async (email, title, body) => {
    try {
        console.log('started');
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            family: 4,
            connectionTimeout: 10000,
            greetingTimeout: 10000,
            socketTimeout: 10000,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
        });
        console.log("middle");
        // Test SMTP connection/authentication
        await transporter.verify();
        console.log("SMTP verified");
        let info = await transporter.sendMail({
            from: `"ApplyFlow - by Ayush" <${process.env.MAIL_USER}>`,
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        })
        console.log(info, 'finished');
        return info;

    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

module.exports = mailSender;