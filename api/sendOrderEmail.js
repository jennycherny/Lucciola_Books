const nodemailer = require('nodemailer');
const cors = require('cors');
const express = require('express');

const app = express();
      app.use(cors());
      app.use(express.json());

app.post('/api/sendOrderEmail', async (req, res) => {
    console.log('Received POST request to /api/sendOrderEmail');
  try {
    const formData = req.body;
    console.log('Received form data:', formData);

    const { buyCart, rentCart, deliveryMethod, selectedCity } = formData;

    console.log('buyCart:', buyCart);
    console.log('rentCart:', rentCart);
    console.log('deliveryMethod:', deliveryMethod);
    console.log('selectedCity:', selectedCity);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'evchern.it@gmail.com', 
        pass: 'wggk fghc vclf eubw', 
      },
    });

    const calculateTotalPrice = (cart) => 
        cart.reduce((total, book) => 
            total + ((book && book.inBuyCart) 
            ? (book.price || 0) 
            : (book.rentPrice || 0)), 
            0);

    const mailOptions = {
      from: 'evchern.it@gmail.com',
      to: 'jennyaldridge629@gmail.com',
      subject: 'Новый заказ книг',
      text: `
        Новый заказ книг:

        Купленные книги
        ${Array.isArray(buyCart) ? buyCart.map((book) => `${book.title}/${book.author} - ${book.price} GEL`).join('\n') : ''}

        Арендованные книги
        ${Array.isArray(rentCart) ? rentCart.map((book) => `${book.title}/${book.author} - ${book.rentPrice} GEL`).join('\n') : ''}

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