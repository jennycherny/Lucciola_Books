import React from 'react';
import './EmptyCartPlaceholder.css'
import cartFrame from '../../assets/frame_cart.svg'


const EmptyCartPlaceholder = () => {
    return (
        <div className='cart-placeholder'>
            <div className="cart-placeholder-text">
                <h2>Корзина пустая</h2>
                <p>Кажется, вы еще не выбрали ни одной книги.<br />Изучите литературу в магазине или библиотеке и возвращайтесь сюда позже</p>
            </div>
            <img src={cartFrame} alt="" />
        </div>
    );
};

export default EmptyCartPlaceholder;