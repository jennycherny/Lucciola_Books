import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../components/Providers/CartProvider';
import PickupMap from '../components/PickupMap/PickupMap';

import './css/Order.css'
import { LuMoreHorizontal } from "react-icons/lu";
import { CiDeliveryTruck } from "react-icons/ci";
import { BsBox2 } from "react-icons/bs";
import { MdOutlinePayment } from "react-icons/md";

const Order = () => {

    const { buyCart, rentCart } = useCart();
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [deliveryMethod, setDeliveryMethod] = useState('delivery'); //выбираем вид доставки для табсов
    const [selectedCity, setSelectedCity] = useState('Тбилиси'); // выбираем город в качестве условия для нескольких функций
    const [hasRentBooks, setHasRentBooks] = useState(false); // проверяем, есть ли книги в аренду (возможны только по Тбилиси)
    const totalPrice = calculateTotalPrice([...buyCart, ...rentCart]);
    const cities = ['Тбилиси', 'Батуми', 'Абаша', 'Амбролаури', 'Ахалкалаки', 'Ахалцихе', 'Ахмета', 
                    'Багдати', 'Болниси', 'Боржоми', 'Вале', 'Вани', 'Гагра', 'Гали', 'Гардабани', 'Гори', 
                    'Гудаута', 'Гурджаани', 'Дедоплис-Цкаро', 'Джвари', 'Дманиси', 'Душети', 'Жинвали', 'Зестафони', 
                    'Зугдиди', 'Карели', 'Каспи', 'Кварели', 'Кобулети', 'Кутаиси', 'Лагодехи', 'Ланчхути', 'Ликани', 
                    'Марнеули', 'Мартвили', 'Мцхета', 'Ниноцминда', 'Озургети', 'Они', 'Очамчира', 'Поти', 'Рустави', 
                    'Сагареджо', 'Самтредиа', 'Сачхере', 'Сенаки', 'Сигнахи', 'Сухум', 'Телави', 'Тержола', 'Тетри-Цкаро', 
                    'Ткварчели', 'Ткибули', 'Хашури', 'Хоби', 'Хони', 'Цагери', 'Цаленджиха', 'Цалка', 'Цнори', 'Цхалтубо', 
                    'Цхинвал', 'Чиатура', 'Чхороцку'];

    useEffect(() => {
        const hasRentBooks = rentCart.length > 0;
        setHasRentBooks(hasRentBooks);
      }, [rentCart]);

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
                <form className='order-form'>
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

                {selectedCity === 'Тбилиси' ? (
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
                      <h4>Книги можно забрать у метро Исани, г. Тбилиси</h4>
                      <p>Оставь свои контакты, и мы договоримся о дате и времени</p>
                      <form className='order-form'>
                        <div className="order-form-item">
                            <label className='email'>Электронная почта:</label>
                            <input type="email" required/>
                        </div>
                        <div className="order-form-item">
                            <label className='phone-number'>Ник в Telegram/ Номер телефона</label>
                            <input type="text" required/>
                        </div>
                      </form>
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
                        <img src={book.img} alt="Обложка книги" />
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

        {hasRentBooks && selectedCity !== 'Тбилиси' && (
            <p className=''>К сожалению, библиотека работает только в Тбилиси. Вернитесь в корзину, уберите арндованные книги и попробуйте выбрать город снова.</p>
        )}
        <div className="order-payment">
            <button 
                type="submit" 
                className="order-pay-button"
                disabled={hasRentBooks && selectedCity !== 'Тбилиси'}
            >
                <MdOutlinePayment />
                <span>Перейти к оплате</span>
            </button>
        </div>
    </div>
    );
};

export default Order;