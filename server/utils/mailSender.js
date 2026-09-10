const nodemailer = require("nodemailer");
require('dotenv').config();
const mailSender = async (email, title, body) => {
    try {
        console.log('started');
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            secure: false,
            family: 4,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
        });
        console.log('middle');
        let info = await transporter.sendMail({
            from: 'ApplyFlow - by Ayush',
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        })
        console.log(info, 'finished');
        return info;

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = mailSender;