import nodemailer from 'nodemailer';

export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { title, author, email, telegram, comment } = req.body;

  // Настройка транспорта для отправки писем
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'evchern.it@gmail.com',
      pass: 'Imabadguy151199',
    },
  });

  // Настройка содержимого письма
  const mailOptions = {
    from: 'evchern.it@gmail.com',
    to: 'jennyaldridge629@gmail.com',
    subject: `Заявка на книгу: ${title}, ${author}`,
    html: `
      <p><strong>Название книги:</strong> ${title}</p>
      <p><strong>Автор:</strong> ${author}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Telegram:</strong> ${telegram}</p>
      <p><strong>Комментарий:</strong> ${comment}</p>
    `,
  };

  try {
    // Отправка письма
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info);
    res.status(200).json({ message: 'Email sent', response: info.response });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}