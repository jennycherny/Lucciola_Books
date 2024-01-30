import React, { useState } from 'react';
import { useParams } from 'react-router';
import Hook from '../components/Hooks/Hook';
import { useCart } from '../components/Providers/CartProvider';

import './css/ShopBookPage.css'
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";

const ShopBookPage = () => {
    const { data, isLoading } = Hook();
    const { bookId } = useParams();
    const { addToBuyCart, removeFromBuyCart, buyCart } = useCart();
    const numericBookId = parseInt(bookId, 10);

    const foundBook = data.find(book => book.id === numericBookId);
    const [detailsOpen, setDetailsOpen] = useState(false);
    
    const isBookInCart = foundBook && buyCart.some((cartBook) => cartBook.id === foundBook.id);
    const cartButtonText = isBookInCart ? 'Добавлено' : 'В корзину';
    const cartButtonClass = `add-to-cart ${isBookInCart ? 'added' : ''}`;

    const handleCartAction = () => {
        if (isBookInCart) {
            removeFromBuyCart(foundBook);
        } else {
            addToBuyCart(foundBook);
        }
    };

    const handleToggleDetails = () => {
      setDetailsOpen(!detailsOpen);
    };

    if (isLoading) {
        return (
            <div>
                <p></p>
            </div>
        );
    }

    if (!foundBook || foundBook.condition !== 'Новая') {
        return (
            <div className='bnf-container'>
                <p>Book not found 😥</p>
            </div>
        );
    }

    const descParagraphs = (text) => {
        return text.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ));
      };

    return (
        <div>
            <div className='bookpage'>
                <div className='bookpage-container'>
                    <div className="bookpage-header">
                        <h2>{foundBook.title}</h2>
                        <h3>{foundBook.author}</h3>
                    </div>

                    <div className="bookpage-price">
                        <h2>{foundBook.price} GEL</h2>
                    </div>

                    <div className="bookpage-img">
                        <img src={foundBook.img} alt="Обложка книги" />
                        <div className="bookpage-data">
                        <div onClick={handleToggleDetails} className="bookpage-data-more"> 
                            <span>Подробнее о книге</span>
                                {detailsOpen ? (
                                    <MdOutlineExpandLess color='#6b6869' size="22px" className="bookpage-data-icon" />
                                ) : (
                                    <MdOutlineExpandMore color='#6b6869' size="22px" className="bookpage-data-icon" />
                                )}
                        </div>

                            {detailsOpen && (
                                <div className={`book-details-expanded ${detailsOpen ? 'open' : ''}`}>
                                    <h7 className="code">Артикул: {foundBook.code}</h7>
                                    <h7 className="category">Категория: {foundBook.category}</h7>
                                    <h7 className="publishing">Издательство: {foundBook.publishing}</h7>
                                    <h7 className="age">Возраст: {foundBook.age}+</h7>
                                    <h7 className="cover">Обложка: {foundBook.cover}</h7>
                                    <h7 className="condition">Состояние: {foundBook.condition}</h7>
                                </div>
                            )}
                    </div>
                    </div>

                    <div className="bookpage-desc">
                        {foundBook.stock === 0 ? (
                            <p className="out-of-stock-message">Нет в наличии</p>
                            ) : (
                            <button className={cartButtonClass} onClick={handleCartAction}>
                                <svg
                                width="18px"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                />
                                </svg>
                                <span>{cartButtonText}</span>
                            </button>
                            )}
                        <div className="bookpage-desc-text">
                            {descParagraphs(foundBook.desc)}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ShopBookPage;