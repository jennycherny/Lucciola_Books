import React from 'react';
import { Link } from "react-router-dom";

const SingleLibraryBookItem = ({ book }) => {    
    return (
        <div className='item' key={book.id}>
        <Link to={`/shop/${book.id}`} className='cards-link'>
          <img src={book.img} alt='Обложка книги' />
          <div className='cardText'>
            <h4 className='title'>{book.title}</h4>
            <h5 className='author'>{book.author}</h5>
          </div>
        </Link>
      </div>
      )
};

export default SingleLibraryBookItem;