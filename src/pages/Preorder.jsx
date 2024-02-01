import React from 'react';
import Footer from '../components/Footer/Footer';
import frame from '../assets/frame_preoder.svg'
import './css/Preorder.css'

const Preorder = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const formData = {
          bookTitle: e.target.elements.title.value,
          author: e.target.elements.author.value,
          email: e.target.elements.email.value,
          telegram: e.target.elements.telegram.value,
          comment: e.target.elements.comment.value,
        };

        console.log('Form data:', formData);

        try {
          // Отправка данных на серверную функцию на Vercel
            const response = await fetch('https://lucciola-books.vercel.app/api/sendPreorderEmail', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          if (!response.ok) {
            throw new Error('Failed to send data');
          }
      
          // Обработка ответа
          const result = await response.json();
          console.log('Response from server:', result);  
        } catch (error) {
          console.error('Error sending data:', error);
        }
      };

    return (
        <div>
            <div className="preorder-container">
                <div className="preorder-form-block">
                    <div className="preorder-title">
                        <p>Не нашли желаемую книгу?</p>
                        <h4>Оставьте заявку, и мы закажем ее для вас</h4>
                    </div>   

                    <form className='order-form' onSubmit={handleSubmit}>
                        <div className="order-form-block">
                            <div className="order-form-item">
                                <label>Название книги</label>
                                <input type="text" name="title" required/>  
                            </div>
                            
                            <div className="order-form-item">
                            <label>Автор</label>
                                <input type="text" name="author" required/>  
                            </div>
                        </div>

                        <div className="order-form-block">
                            <div className="order-form-item">
                                <label className='email'>Электронная почта:</label>
                                <input type="email" name="email" required/>
                            </div>
                            <div className="order-form-item">
                                <label className='phone-number'>Ник в Telegram/ Номер телефона</label>
                                <input type="text" name="telegram" required/>
                            </div>
                        </div>
                                
                        <div className="order-form-item">
                            <label className='more-info'>Комментарий</label>
                            <textarea name="comment"/>
                        </div>

                        <div className="preorder-buttons">
                            <div className="">
                                <button 
                                    type="submit" 
                                    className="preorder-submit-button"
                                >Отправить</button>
                            </div>
                        </div>
                    </form>
                </div>
                <img src={frame} alt="" />
            </div>
            <Footer/>
        </div>
    );
};

export default Preorder;