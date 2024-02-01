import React, { useState } from 'react';
import Footer from '../components/Footer/Footer';
import frame from '../assets/frame_preoder.svg'
import './css/Preorder.css'

const Preorder = () => {

    const [isModalOpen, setModalOpen] = useState(false);
    
    const initialFormData = {
        title: '',
        author: '',
        email: '',
        telegram: '',
        comment: '',
      };

    const [formData, setFormData] = useState(initialFormData);
    
    const closeModal = () => {
        setModalOpen(false);
      };
    
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
          // Открываем модальное окно

          setModalOpen(true);
          setFormData(initialFormData);

        } catch (error) {
          console.error('Error sending data:', error);
        }
      };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
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
                                <input 
                                    type="text" 
                                    name="title" 
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                />  
                            </div>
                            
                            <div className="order-form-item">
                            <label>Автор</label>
                                <input 
                                    type="text" 
                                    name="author" 
                                    value={formData.author}
                                    onChange={handleInputChange}  
                                    required
                                />  
                            </div>
                        </div>

                        <div className="order-form-block">
                            <div className="order-form-item">
                                <label className='email'>Электронная почта:</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required/>
                            </div>
                            <div className="order-form-item">
                                <label className='phone-number'>Ник в Telegram/ Номер телефона</label>
                                <input 
                                    type="text" 
                                    name="telegram" 
                                    value={formData.telegram}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                                
                        <div className="order-form-item">
                            <label className='more-info'>Комментарий</label>
                            <textarea 
                                name="comment"
                                value={formData.comment}
                                onChange={handleInputChange}
                            />
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

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h4>Ваш предзаказ принят 🤓</h4>
                        <p>Мы займемся им в ближайшее время</p>
                        <button onClick={closeModal}>Спасибо!</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Preorder;