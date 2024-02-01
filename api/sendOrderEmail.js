const nodemailer = require('nodemailer');
const cors = require('cors');
const express = require('express');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/sendOrderEmail', async (req, res) => {
  try {
    const formData = req.body;
    const { buyCart, rentCart, deliveryMethod, selectedCity } = formData;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'evchern.it@gmail.com', 
        pass: 'wggk fghc vclf eubw', 
      },
    });

    const calculateTotalPrice = (cart) => 
        cart.reduce((total, book) => total + (book.inBuyCart ? book.price : book.rentPrice), 0);

    const mailOptions = {
      from: 'evchern.it@gmail.com', // Замените на свой электронный адрес
      to: 'jennyaldridge629@gmail.com', // Замените на адрес получателя
      subject: 'Новый заказ книг',
      text: `
        Новый заказ книг:

        ${buyCart.length > 0 ? 'Купленные книги:' : ''}
        ${buyCart.map((book) => `${book.title}/${book.author} - ${book.price} GEL`).join('\n')}

        ${rentCart.length > 0 ? 'Арендованные книги:' : ''}
        ${rentCart.map((book) => `${book.title}/${book.author} - ${book.rentPrice} GEL`).join('\n')}

        Общая стоимость: ${calculateTotalPrice([...buyCart, ...rentCart])} GEL

        Вид доставки: ${deliveryMethod}
        Город: ${selectedCity}
        Адрес: ${formData.address}

        Дополнительная информация:
        ${formData.email}
        ${formData.telegram}
        ${formData.comment || 'Отсутствует'}
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