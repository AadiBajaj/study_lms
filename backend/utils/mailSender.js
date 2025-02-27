const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const info = await transporter.sendMail({
            from: process.env.MAIL_USER,  // ✅ Use a valid email
            to: email,
            subject: title,
            html: body
        });

        console.log('Email sent successfully to:', email, 'Message ID:', info.messageId);
        return info;
    } catch (error) {
        console.error('Error while sending mail:', error);
        throw error; // ✅ Re-throw for better debugging
    }
};

module.exports = mailSender;
