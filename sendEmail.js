const nodemailer = require('nodemailer');

async function sendEmail() {
  // Настройка транспорта для отправки писем через Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'evchern.it@gmail.com',
      pass: 'wggk fghc vclf eubw',
    },
  });

  // Настройка содержимого письма
  const mailOptions = {
    from: 'evchern.it@gmail.com',
    to: 'jennyaldridge629@gmail.com',
    subject: 'Тестовое письмо',
    text: 'Привет, это тестовое письмо от Nodemailer через Gmail!',
  };

  try {
    // Отправка письма
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// Вызов функции для отправки письма
sendEmail();