import React from 'react';
import { Link } from "react-router-dom";
import './SingleLibraryBookItem.css'

const SingleLibraryBookItem = ({ book }) => {    

    const languageStickerText = book.language
    ? `${book.language.charAt(0).toUpperCase() + book.language.slice(1)} язык`
    : null;

    return (
        <div className='item' key={book.id}>
        <Link to={`/library/${book.id}`} className='cards-link'>
          <img src={book.img} alt='Обложка книги' className='book-item-img'/>
          <div className='cardText'>
            <h4 className='title'>{book.title}</h4>
            <h5 className='author'>{book.author}</h5>
          </div>
          {languageStickerText && <div className='sticker'>{languageStickerText}</div>}
        </Link>
      </div>
      )
};

export default SingleLibraryBookItem;