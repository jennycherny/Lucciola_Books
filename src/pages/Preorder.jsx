import React, { useState } from 'react';
import Footer from '../components/Footer/Footer';
import frame from '../assets/frame_preoder.svg'
import './css/Preorder.css'

const Preorder = () => {

    const [isModalOpen, setModalOpen] = useState(false);
    
    const initialFormData = {
        title: '',
        author: '',
        phone: '',
        instagram: '',
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
          phone: e.target.elements.phone.value,
          instagram: e.target.elements.instagram.value,
          comment: e.target.elements.comment.value,
        };


        try {
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
      
          const result = await response.json();
          console.log('Response from server:', result);  

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
                                <label className='email'>Номер телефона</label>
                                <input 
                                    type="text" 
                                    name="phone" 
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required/>
                            </div>
                            <div className="order-form-item">
                                <label className='phone-number'>Ник в Instagram</label>
                                <input 
                                    type="text" 
                                    name="instagram" 
                                    value={formData.instagram}
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

                        <div className="warning-block">
                            <div className="warning-block-icon">
                                <svg width="24px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                </svg>

                            </div>
                            <div className="warning-block-text">
                                Номер телефона должен быть привязан <br />к аккаунту в Тelegram или Whatsapp
                            </div>
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