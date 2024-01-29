import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/Providers/CartProvider';
import './css/Cart.css'
import { IoBagCheckOutline } from "react-icons/io5";

const Cart = () => {
    const { buyCart, rentCart, removeFromBuyCart, removeFromRentCart } = useCart();
    const navigate = useNavigate();
    
    const calculateTotalPrice = (cart) => {
        return cart.reduce((total, book) => {
            const priceToUse = book.inBuyCart ? book.price : book.rentPrice;
            return total + priceToUse;
        }, 0);
    };

    const handleCheckout = () => {
        // Перенаправить пользователя на страницу "/order" при оформлении заказа
        navigate('/order');
      };

    return (
        <div className='cart-container'>
                <h2> Купить </h2>
                <ul>
                    {buyCart.map((book) => (
                        <li key={book.id} className="cart-book">
                            <div className="cart-book-title">
                                <img src={book.img} alt="Обложка книги" />
                                <div>
                                    <h4 className="cart-book-title">{book.title}</h4>
                                    <h5 className="cart-book-author">{book.author}</h5>
                                </div>
                            </div>
                            <p>1 шт.</p>
                            <h4 className="cart-book-price">{book.price} GEL</h4>
                            <button className='cart-book-delete' onClick={() => removeFromBuyCart(book)}>
                                <svg width='15px' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </li>
                    ))}
                </ul>


            <h2> Арендовать </h2>
            <ul>
                {rentCart.map((book) => (
                    <li key={book.id} className="cart-book">
                        <div className="cart-book-title">
                            <img src={book.img} alt="обложка книги" />
                            <div>
                                <h4 className="cart-book-title">{book.title}</h4>
                                <h5 className="cart-book-author">{book.author}</h5>
                            </div>
                        </div>
                        <p>1 шт.</p>
                        <h4 className="cart-book-price">{book.rentPrice} GEL</h4>
                        <button className='cart-book-delete' onClick={() => removeFromRentCart(book)}>
                            <svg width='15px' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </li>
                ))}
            </ul>
            <div>
                <div className='total-price'>
                    <h3> Общая сумма: <span>{calculateTotalPrice([...buyCart, ...rentCart])} GEL </span></h3>
                </div>
                <div className="cart-buy-button">
                    <button onClick={handleCheckout}>
                        <IoBagCheckOutline size={17}/>
                        <span>
                           Оформить заказ 
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;