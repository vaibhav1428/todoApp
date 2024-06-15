const nodemailer = require('nodemailer');
const config = require('../config/config');

class MailClass {
   sendmail = async (mail, subject, body, attachments = []) => {
        const transporter = nodemailer.createTransport({
            host: config.email.smtp.host,
            port: config.email.smtp.port,
            secure: false, 
            auth: {
                user: config.email.smtp.auth.user, 
                pass: config.email.smtp.auth.pass, 
            },
        });

        await transporter.sendMail({
            from: config.email.from, 
            to: mail, 
            subject, 
            html: body, 
            attachments,
        });
    };
}

const mailSender = new MailClass();
module.exports =  mailSender