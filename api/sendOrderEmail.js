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
    console.log('Request body:', req.body);

    const { buyCart, rentCart, deliveryMethod, totalAmount, city, address, email, telegram, comment} = formData;

    console.log('buyCart:', buyCart);
    console.log('rentCart:', rentCart);
    console.log('deliveryMethod:', deliveryMethod);
    console.log('totalAmount:', totalAmount);
    console.log('city:', city);
    console.log('address:', address);
    console.log('email:', email);
    console.log('telegram:', telegram);
    console.log('comment:', comment);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'evchern.it@gmail.com', 
        pass: 'wggk fghc vclf eubw', 
      },
    });

    function calculateTotalPrice(cart) {
        if (!Array.isArray(cart)) {
            console.error('Invalid cart:', cart);
            return 0;
        }
    
        return cart.reduce((total, book) => {
            const priceToUse = book.inBuyCart ? (typeof book.price === 'number' ? book.price : 0) : 
                                               (typeof book.rentPrice === 'number' ? book.rentPrice : 0);
            return total + priceToUse;
        }, 0);
    }

    const mailOptions = {
      from: 'evchern.it@gmail.com',
      to: 'lucciola.books@gmail.com',
      subject: 'Новый заказ книг',
      text: `
        Новый заказ книг:

        ${buyCart.length > 0 ? 'Купленные книги:' : ''}
        ${buyCart.map(book => `${book.title}, ${book.author} - ${(book.inBuyCart ? book.price : book.rentPrice) || 0} GEL`).join('\n')}

        ${rentCart.length > 0 ? 'Арендованные книги:' : ''}
        ${rentCart.map(book => `${book.title}, ${book.author} - ${(book.inBuyCart ? book.price : book.rentPrice) || 0} GEL`).join('\n')}

        Общая стоимость: ${city === 'Тбилиси' && deliveryMethod === 'delivery' ? 
                                calculateTotalPrice([...buyCart, ...rentCart]) + 5 : 
                                calculateTotalPrice([...buyCart, ...rentCart])} GEL

        Вид доставки: ${deliveryMethod}

        Контактные данные: 

        Город: ${city || 'Самовывоз'}
        Адрес: ${address || 'Самовывоз'}
        Email: ${email}
        Telegram/Номер телефона: ${telegram}

        Комментарий: ${comment || 'Отсутствует'}
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