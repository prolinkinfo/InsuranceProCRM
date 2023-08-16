import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    auth: {
        user: '',
        pass: ''
    }
});

const sendMail = async (to, subject, message, html) => {
    try {
        const mailOptions = {
            from: 'm', // Replace with your email address
            to: to, // Replace with the recipient's email address
            subject: subject,
            text: message,
        };

        const info = await transporter.sendMail(mailOptions);

        console.log('Email sent:', info.response);
        // res.send('Email sent successfully');
    } catch (error) {
        console.log('Error sending email:', error);
        // res.status(500).send('Error sending email');
    }
}

export default sendMail

