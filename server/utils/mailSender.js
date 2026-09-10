const nodemailer = require("nodemailer");
require('dotenv').config();
const mailSender = async (email, title, body) => {
    try {
        console.log('started sending ')
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
        });
        console.log("SMTP connection successful");
        let info = await transporter.sendMail({
            from: 'ApplyFlow - by Ayush',
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        })
        console.log("Email sent:", info.messageId);
        return info;

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = mailSender;