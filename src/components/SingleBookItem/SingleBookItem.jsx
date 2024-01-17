import React from 'react';
import { Link } from "react-router-dom";
import '../SingleLibraryBookItem/SingleLibraryBookItem.css'

const SingleBookItem = ({ book }) => {    

  const languageStickerText = book.language
  ? `${book.language.charAt(0).toUpperCase() + book.language.slice(1)} язык`
  : null;

    return (
      <div className='item' key={book.id}>
        <Link to={`/shop/${book.id}`} className='cards-link'>
          <img src={book.img} alt='Обложка книги' />
          <div className='cardText'>
            <h4 className='title'>{book.title}</h4>
            <h5 className='author'>{book.author}</h5>
            <h3 className='price'>{book.price} GEL</h3>
          </div>
        {languageStickerText && <div className='sticker'>{languageStickerText}</div>}
        </Link>
        <button className='add-to-cart'>
          <svg width='15px' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
          В корзину
        </button>
      </div>
      )
};

export default SingleBookItem;