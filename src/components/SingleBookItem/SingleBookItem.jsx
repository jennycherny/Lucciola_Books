import React from 'react';
import { Link } from "react-router-dom";

const SingleBookItem = ({ book }) => {    
    return (
        <div className='item' key={book.id}>
        <Link to={`/shop/${book.id}`} className='cards-link'>
          <img src={book.img} alt='Обложка книги' />
          <div className='cardText'>
            <h4 className='title'>{book.title}</h4>
            <h5 className='author'>{book.author}</h5>
            <h3 className='price'>{book.price} GEL</h3>
          </div>
        </Link>
      </div>
      )
};

export default SingleBookItem;