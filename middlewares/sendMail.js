import nodemailer from 'nodemailer'; // Import nodemailer
import dotenv from 'dotenv'; // Import dotenv to load environment variables

dotenv.config(); // Load environment variables from .env file

const { SMTP_MAIL, SMTP_PASSWORD, SMTP_HOST, SMTP_PORT } = process.env; // Destructure environment variables

const sendMail = async (email, mailSubject, content) => {
    try {
        const transport = nodemailer.createTransport({
            host: SMTP_HOST || 'smtp.gmail.com',
            port: SMTP_PORT || 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: SMTP_MAIL,
                pass: SMTP_PASSWORD
            }
        });

        const mailOptions = {
            from: SMTP_MAIL,
            to: email,
            subject: mailSubject,
            html: content
        };

        const info = await transport.sendMail(mailOptions);
        console.log('Mail sent successfully:', info.response);

    } catch (error) {
        console.error(`Error sending mail: ${error.message}`);
        throw error; // Re-throw error to handle it properly in the calling function
    }
};

export default sendMail; // Export sendMail function
