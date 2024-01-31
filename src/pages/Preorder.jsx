import React from 'react';
import Footer from '../components/Footer/Footer';
import frame from '../assets/frame_preoder.svg'
import './css/Preorder.css'

const Preorder = () => {
    return (
        <div>
            <div className="preorder-container">
                <div className="preorder-form-block">
                    <div className="preorder-title">
                        <p>Не нашли желаемую книгу?</p>
                        <h4>Оставьте заявку, и мы закажем ее для вас</h4>
                    </div>   

                    <form className='order-form'>
                        <div className="order-form-block">
                            <div className="order-form-item">
                                <label>Название книги</label>
                                <input type="text" required/>  
                            </div>
                            
                            <div className="order-form-item">
                            <label>Автор</label>
                                <input type="text" required/>  
                            </div>
                        </div>

                        <div className="order-form-block">
                            <div className="order-form-item">
                                <label className='email'>Электронная почта:</label>
                                <input type="email" required/>
                            </div>
                            <div className="order-form-item">
                                <label className='phone-number'>Ник в Telegram/ Номер телефона</label>
                                <input type="text" required/>
                            </div>
                        </div>
                                
                        <div className="order-form-item">
                            <label className='more-info'>Комментарий</label>
                            <textarea />
                        </div>
                    </form>

                    <div className="preorder-buttons">
                        <div className="">
                            <button 
                                type="submit" 
                                className="preorder-submit-button"
                            >Отправить</button>
                        </div>
                    </div>
                </div>
                <img src={frame} alt="" />
            </div>
            <Footer/>
        </div>
    );
};

export default Preorder;