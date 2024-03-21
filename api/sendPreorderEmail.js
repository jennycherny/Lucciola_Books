const nodemailer = require('nodemailer');
const cors = require('cors');
const express = require('express');

const app = express();
      app.use(cors());
      app.use(express.json());

app.post('/api/sendPreorderEmail', async (req, res) => {
  try {
    const formData = req.body;
    console.log('Received form data:', formData);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'evchern.it@gmail.com',
        pass: 'wggk fghc vclf eubw'
      },
    });

    const mailOptions = {
      from: 'evchern.it@gmail.com',
      to: 'lucciola.books@gmail.com',
      subject: 'Новый предзаказ',
      text: `
      Новый предзаказ

      Название книги: ${formData.bookTitle}
      Автор: ${formData.author}
      Электронная почта: ${formData.email}
      Telegram: ${formData.telegram}
      Комментарий: ${formData.comment || 'Отсутствует'}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: 'Error sending email', details: error.message });
  }
});

module.exports = app;