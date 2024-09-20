const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'erfan.shokr300@gmail.com',
            pass: 'dlnvzqzgqjzqzqzq'
        }
    });

    const mailOptions = {
      from: email,
      to: "erfan.shokr300@gmail.com",
      subject: `New comment from ${name}`,
      text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: error.toString() });
        }
        res.status(200).json({ message: 'Email sent successfully!' });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});