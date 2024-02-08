import React, { useState } from 'react';
import { useParams } from 'react-router';
import Hook from '../components/Hooks/Hook';
import { useCart } from '../components/Providers/CartProvider';
import './css/LibraryBookPage.css'
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import Footer from '../components/Footer/Footer';

const LibraryBookPage = () => {
    const { data, isLoading } = Hook();
    const { bookId } = useParams();
    const { rentCart, buyCart, addToRentCart, addToBuyCart, removeFromRentCart, removeFromBuyCart } = useCart();
    const numericBookId = parseInt(bookId, 10);

    const foundBook = data.find(book => book.id === numericBookId);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(foundBook && foundBook.img ? foundBook.img : '');

    const isBookInRentCart = foundBook && rentCart.some((cartBook) => cartBook.id === foundBook.id);
    const isBookInBuyCart = foundBook && buyCart.some((cartBook) => cartBook.id === foundBook.id);

    const rentCartButtonText = isBookInRentCart ? 'Добавлено' : 'Арендовать';
    const rentCartButtonClass = `add-to-cart ${isBookInRentCart ? 'added' : ''}`;

    const buyCartButtonText = isBookInBuyCart ? 'Добавлено' : 'Купить';
    const buyCartButtonClass = `add-to-cart ${isBookInBuyCart ? 'added' : ''}`;

    const handleAddToRentCart = () => {
        if (isBookInBuyCart) {
          removeFromBuyCart(foundBook);
        }
        isBookInRentCart ? removeFromRentCart(foundBook) : addToRentCart(foundBook);
      };

    const handleAddToBuyCart = () => {
        if (isBookInRentCart) {
        removeFromRentCart(foundBook);
        }
        isBookInBuyCart ? removeFromBuyCart(foundBook) : addToBuyCart(foundBook);
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

    if (!foundBook || foundBook.condition !== 'Б/У') {
        return (
            <div className='bnf-container'>
                <p>Книга не найдена 😥</p>
            </div>
        );
    }

    const descParagraphs = (text) => {
        return text.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ));
      };

    const handleThumbnailClick = (img) => {
        setCurrentImage(img);
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
                        <h2> {foundBook.rentPrice} GEL/ {foundBook.price} GEL</h2>
                    </div>

                    {foundBook && (
                        <div className='bookpage-img'>
                            {foundBook.img && (
                                <img src={currentImage || foundBook.img} alt="Фото книги" />
                            )}
                            {foundBook.img2 && (
                                <div className='thumbnails-container'>
                                    <div className='bookpage-img-thumbnail' onClick={() => handleThumbnailClick(foundBook.img)}>
                                        <img src={foundBook.img} alt='Thumbnail 1' />
                                    </div>
                                    <div className='bookpage-img-thumbnail' onClick={() => handleThumbnailClick(foundBook.img2)}>
                                        <img src={foundBook.img2} alt='Thumbnail 2' />
                                    </div>
                                    {foundBook.img3 && (
                                    <div className='bookpage-img-thumbnail' onClick={() => handleThumbnailClick(foundBook.img3)}>
                                        <img src={foundBook.img3} alt='Thumbnail 3' />
                                    </div>
                                    )}
                                    {foundBook.img4 && (
                                    <div className='bookpage-img-thumbnail' onClick={() => handleThumbnailClick(foundBook.img4)}>
                                        <img src={foundBook.img4} alt='Thumbnail 4' />
                                    </div>
                                    )}
                                </div>
                            )}

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
                                        <h7 className="category">Категория: {foundBook.category}</h7>
                                        <h7 className="publishing">Издательство: {foundBook.publishing}</h7>
                                        <h7 className="age">Возраст: {foundBook.age}+</h7>
                                        <h7 className="cover">Обложка: {foundBook.cover}</h7>
                                        <h7 className="condition">Состояние: {foundBook.condition}</h7>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="bookpage-desc">
                        {foundBook.stock === 0 ? (
                            <p className="out-of-stock-message">Нет в наличии</p>
                        ) : (
                            <div className="bookpage-desc-buttons">
                            <button className={rentCartButtonClass} onClick={handleAddToRentCart}>
                                <svg width="18px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                                </svg>
                                <span>{rentCartButtonText}</span>
                            </button>
                            <button className={buyCartButtonClass} onClick={handleAddToBuyCart}>
                                <svg width="18px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                                <span>{buyCartButtonText}</span>
                            </button>
                            </div>
                        )}
                        <div className="bookpage-desc-text">
                            {descParagraphs(foundBook.desc)}
                        </div>
                    </div>
                    
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default LibraryBookPage;