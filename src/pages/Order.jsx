import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../components/Providers/CartProvider';
import PickupMap from '../components/PickupMap/PickupMap';

import './css/Order.css'
import { LuMoreHorizontal } from "react-icons/lu";
import { CiDeliveryTruck } from "react-icons/ci";
import { BsBox2 } from "react-icons/bs";
import { MdOutlinePayment } from "react-icons/md";

import noPhoto from './../assets/no-photo.png';

const Order = () => {
    const navigate = useNavigate();
    const { buyCart, rentCart, setBuyCart, setRentCart } = useCart();
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [deliveryMethod, setDeliveryMethod] = useState('delivery'); //выбираем вид доставки для табсов
    const [selectedCity, setSelectedCity] = useState('Тбилиси'); // выбираем город в качестве условия для нескольких функций
    const [hasRentBooks, setHasRentBooks] = useState(false); // проверяем, есть ли книги в аренду (возможны только по Тбилиси)
    const [libraryMessageVisible, setLibraryMessageVisible] = useState(false); // показываем сообщение, если доставка книг в аренду НЕ в Тбилиси
    const [isModalOpen, setModalOpen] = useState(false);

    const totalPrice = calculateTotalPrice([...buyCart, ...rentCart]);
    const cities = ['Тбилиси', 'Батуми', 'Абаша', 'Амбролаури', 'Ахалкалаки', 'Ахалцихе', 'Ахмета', 
                    'Багдати', 'Болниси', 'Боржоми', 'Вале', 'Вани', 'Гардабани', 'Гори', 
                    'Гурджаани', 'Дедоплис-Цкаро', 'Джвари', 'Дманиси', 'Душети', 'Жинвали', 'Зестафони', 
                    'Зугдиди', 'Карели', 'Каспи', 'Кварели', 'Кобулети', 'Кутаиси', 'Лагодехи', 'Ланчхути', 'Ликани', 
                    'Марнеули', 'Мартвили', 'Мцхета', 'Ниноцминда', 'Озургети', 'Они', 'Поти', 'Рустави', 
                    'Сагареджо', 'Самтредиа', 'Сачхере', 'Сенаки', 'Сигнахи', 'Телави', 'Тержола', 'Тетри-Цкаро', 
                    'Ткибули', 'Хашури', 'Хоби', 'Хони', 'Цагери', 'Цаленджиха', 'Цалка', 'Цнори', 'Цхалтубо', 
                    'Цхинвал', 'Чиатура', 'Чхороцку'];

    useEffect(() => {
        const hasRentBooks = rentCart.length > 0;
        setHasRentBooks(hasRentBooks);

        if (deliveryMethod === 'pickup') {
            setLibraryMessageVisible(false);
          } else {
            // Если метод доставки - 'delivery' и есть арендованные книги, показываем сообщение
            setLibraryMessageVisible(hasRentBooks);
          }
      }, [rentCart, deliveryMethod]);

    function calculateTotalPrice(cart) {
        return cart.reduce((total, book) => {
          const priceToUse = book.inBuyCart ? book.price : book.rentPrice;
          return total + priceToUse;
        }, 0);
      }
    
    const toggleDetailsVisibility = () => {
        setDetailsVisible(!detailsVisible);
    };

    const handleDeliveryMethodChange = (method) => {
        setDeliveryMethod(method);
      };

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const resetForm = () => {
        const deliveryForm = document.getElementById('delivery-form');
        const pickupForm = document.getElementById('pickup-form');

        if (deliveryForm) {
            deliveryForm.reset();
            setSelectedCity('Тбилиси');
        }

        if (pickupForm) {
            pickupForm.reset();
        }
    };

    const clearCart = () => {
        setBuyCart([]);
        setRentCart([]);
        localStorage.removeItem('buyCart'); // Очищаем локальное хранилище
        localStorage.removeItem('rentCart');
    };

    const handleThankYouButtonClick = () => {
        clearCart();
        closeModal(); 
        navigate('/cart'); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('buyCart:', buyCart);
        console.log('rentCart:', rentCart);

        if (!Array.isArray(buyCart) || !Array.isArray(rentCart)) {
            console.error('Invalid buyCart or rentCart');
            return;
        }
    
        let formData;

        const currentBuyCart = Array.isArray(buyCart) ? buyCart : [];
        const currentRentCart = Array.isArray(rentCart) ? rentCart : [];

        if (!Array.isArray(currentBuyCart) || !Array.isArray(currentRentCart)) {
            console.error('Invalid buyCart or rentCart');
            return;
        }
    
        if (deliveryMethod === 'delivery') {
            formData = {
                city: selectedCity,
                address: e.target.elements.address.value,
                phone: e.target.elements.phone.value,
                instagram: e.target.elements.instagram.value,
                comment: e.target.elements.comment.value,
                buyCart: currentBuyCart,
                rentCart: currentRentCart,
                deliveryMethod,
                totalAmount: selectedCity === 'Тбилиси' ? totalPrice + 5 : totalPrice,
            };
        } else if (deliveryMethod === 'pickup') {
            formData = {
                phone: e.target.elements.phone.value,
                instagram: e.target.elements.instagram.value,
                buyCart: currentBuyCart,
                rentCart: currentRentCart,
                deliveryMethod,
                totalAmount: totalPrice,
            };
        }

        console.log('Form Data:', formData);
    
        // Отправить данные на сервер
        try {
            const response = await fetch('https://lucciola-books.vercel.app/api/sendOrderEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Email sent successfully!');
                resetForm();
                clearCart();
                openModal();
            } else {
                console.error('Failed to send email.');
            }
        } catch (error) {
             console.error('Error in handleSubmit:', error);
        }
    };

    const getImagePath = (book) => {
        return book.img ? book.img : noPhoto;
    };

    return (
        <div className="order-container">
            <div className="order-form-item choose">
                
            <h3>Выберите вид доставки</h3>

            <div className="delivery-tabs">
                <button
                className={`delivery-tab ${deliveryMethod === 'delivery' ? 'active' : ''}`}
                onClick={() => handleDeliveryMethodChange('delivery')}
                >
                    <CiDeliveryTruck size={19}/>
                    <span>
                    Доставка  
                    </span>
                </button>
                <button
                className={`delivery-tab ${deliveryMethod === 'pickup' ? 'active' : ''}`}
                onClick={() => handleDeliveryMethodChange('pickup')}
                >
                    <BsBox2 size={15}/>
                    <span>
                    Самовывоз  
                    </span>
                </button>
            </div>

            </div>

            {deliveryMethod === 'delivery' && (
                <div className="order-form-container">
                    <form className='order-form' id='delivery-form' onSubmit={handleSubmit}>
                        <div className="order-form-block">
                            <div className="order-form-item">
                                <label>Город</label>
                                <select 
                                    onChange={(e) => setSelectedCity(e.target.value)} 
                                    value={selectedCity}
                                >
                                    {cities.map((city) => (
                                        <option key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="order-form-item">
                            <label>Адрес</label>
                                <input 
                                    type="text" 
                                    name="address" 
                                    required
                                />  
                            </div>
                        </div>

                        <div className="order-form-block">
                            <div className="order-form-item">
                                <label className='phone'>Номер телефона</label>
                                <input 
                                    type="text" 
                                    name="phone" 
                                    required
                                />
                            </div>
                            <div className="order-form-item">
                                <label className='instagram'>Ник в Instagram</label>
                                <input 
                                    type="text" 
                                    name="instagram" 
                                    required
                                />
                            </div>
                        </div>
                                
                        <div className="order-form-item">
                            <label className='more-info'>Комментарий</label>
                            <textarea name="comment"/>
                        </div>
                    </form>

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

                    {selectedCity === 'Тбилиси' && deliveryMethod === 'delivery' ? (
                        <div className="order-info-options">
                            <p className=''>Доставка по Тбилиси: 5 GEL</p>
                            <p className='price'>Общая стоимость: {totalPrice + 5} GEL</p>
                        </div>
                        ) : (
                        <div className="order-info-options">
                            <p className=''>Доставка оплачивается отдельно</p>
                            <p className='price'>Общая стоимость: {totalPrice} GEL</p>
                        </div>
                        )}
                </div>
            )}

            {deliveryMethod === 'pickup' && (
                <div className="pickup">
                    <div className="pickup-container" >
                        <div className='pickup-info'>
                            <div className="pickup-info-text">
                                <p>Книги можно забрать у метро Исани, г. Тбилиси</p>
                                <p>Оставь свои контакты, и мы договоримся о дате и времени</p>
                            </div>
                            <form className='order-form' id='pickup-form' onSubmit={handleSubmit}>
                                <div className="order-form-item">
                                    <label className='phone'>Номер телефона</label>
                                    <input 
                                        type="text" 
                                        name="phone" 
                                        required
                                    />
                                </div>
                                <div className="order-form-item">
                                    <label className='instagram'>Ник в Instagram</label>
                                    <input 
                                        type="text" 
                                        name="instagram" 
                                        required
                                    />
                                </div>
                            </form>

                            <div className="warning-block" id='pickup-warning-block'>
                                <div className="warning-block-icon">
                                    <svg width="24px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                    </svg>

                                </div>
                                <div className="warning-block-text">
                                    Номер телефона должен быть привязан к аккаунту в Тelegram или Whatsapp
                                </div>
                            </div>

                        </div>

                        <div className="pickup-map">
                            <PickupMap className="map"/> 
                        </div> 
                    </div>
                    <div className="order-info-options">
                        <p className=''>Самовывоз: бесплатно</p>
                        <p className='price'>Общая стоимость: {totalPrice} GEL</p>
                    </div>
                </div>
                )}

            <div className="order-info">
                <div className='order-more-info' onClick={toggleDetailsVisibility}>
                    <h4>Подробнее о заказе</h4>
                    <LuMoreHorizontal/>
                </div>

                {detailsVisible && (
                <div>
                    <ul className="order-book-items">
                    {[...buyCart, ...rentCart].map((book) => (
                        <li key={book.id} className='order-book-item'>
                        <Link to={book.condition === 'Новая' ? `/shop/${book.id}` : `/library/${book.id}`}>
                            <img src={getImagePath(book)} alt="Обложка книги" />
                            <p className='title'>{book.title}</p>
                            <p className='author'>{book.author}</p>
                            <p className='price'>{book.inBuyCart ? book.price : book.rentPrice} GEL</p>
                        </Link>
                        </li>
                    ))}
                    </ul>
                </div>
                )}
            </div>

            {libraryMessageVisible && selectedCity !== 'Тбилиси' && (
                <p className='order-warning'>
                    К сожалению, библиотека работает только в Тбилиси. 
                    Вернитесь в корзину, удалите арендованные книги и попробуйте выбрать город снова.
                </p>
            )}
            <div className="order-payment">
                <button 
                    type="submit" 
                    className="order-pay-button"
                    form={deliveryMethod === 'delivery' ? 'delivery-form' : 'pickup-form'}
                    disabled={hasRentBooks && deliveryMethod === 'delivery' && selectedCity !== 'Тбилиси'}            
                >
                    <MdOutlinePayment />
                    <span>Перейти к оплате</span>
                </button>
            </div>
            {isModalOpen && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <p>Оплата картой на сайте пока в разработке 🛠 </p>
                    <h4>Мы приняли заказ и свяжемся<br /> с вами в ближайшее время👌🏻</h4>
                    <button onClick={handleThankYouButtonClick}>Спасибо!</button>
                </div>
            </div>
            )}
    </div>
    );
};

export default Order;