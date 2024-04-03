import React from 'react';
import { Link } from "react-router-dom";
import { useCart } from '../Providers/CartProvider';
import './SingleLibraryBookItem.css';
import noPhoto from './../../assets/no-photo.png';

const SingleLibraryBookItem = ({ book }) => {    
    const { rentCart, buyCart, addToRentCart, addToBuyCart, removeFromRentCart, removeFromBuyCart } = useCart();

    const languageStickerText = book.language
    ? `${book.language.charAt(0).toUpperCase() + book.language.slice(1)} язык`
    : null;

    const isBookInRentCart = rentCart.some((cartBook) => cartBook.id === book.id);
    const isBookInBuyCart = buyCart.some((cartBook) => cartBook.id === book.id);

    const rentCartButtonText = isBookInRentCart ? 'Добавлено' : 'Арендовать';
    const rentCartButtonClass = `add-to-cart ${isBookInRentCart ? 'added' : ''}`;
    

    const buyCartButtonText = isBookInBuyCart ? 'Добавлено' : 'Купить';
    const buyCartButtonClass = `add-to-cart ${isBookInBuyCart ? 'added' : ''}`;

    const handleAddToRentCart = () => {
        if (isBookInBuyCart) {
          removeFromBuyCart(book);
        }
        isBookInRentCart ? removeFromRentCart(book) : addToRentCart(book);
      };

    const handleAddToBuyCart = () => {
        if (isBookInRentCart) {
        removeFromRentCart(book);
        }
        isBookInBuyCart ? removeFromBuyCart(book) : addToBuyCart(book);
    };

    const noImage = book.img ? book.img : noPhoto;

    return (
        <div className='item' key={book.id}>
        <Link to={`/library/${book.id}`} className='cards-link'>
          <img src={noImage} alt='Обложка книги' className='book-item-img'/>
          <div className='cardText'>
            <h4 className='title'>{book.title}</h4>
            <h5 className='author'>{book.author}</h5>
            <h3 className='price'>{book.rentPrice} GEL{book.price && `/ ${book.price} GEL`}</h3>
          </div>
          {languageStickerText && <div className='sticker'>{languageStickerText}</div>}
        </Link>
        <div className='library-buttons'>
            <div className="">
                <button className={rentCartButtonClass} onClick={handleAddToRentCart}>
                    <svg width='18px'xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                    </svg>
                    <span>
                        {rentCartButtonText}
                    </span>
                </button>
            </div>
            {book.price && (
            <div className="">
                <button className={buyCartButtonClass} onClick={handleAddToBuyCart}>
                    <svg width='18px' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                    <span>
                        {buyCartButtonText}
                    </span>
                </button>
            </div>
            )}
        </div>
      </div>
      )
};

export default SingleLibraryBookItem;