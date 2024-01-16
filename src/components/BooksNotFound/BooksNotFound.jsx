import React from 'react';
import cvg from './../../assets/books_not_found.svg'
import './BooksNotFound.css'

const BooksNotFound = () => {
    return (
        <div className='error'>
            <img 
                src={cvg} 
                alt="" 
                width='400px'
            />
            <div className>
                <h1>Книги не найдены</h1>
                <p>Попробуйте подобрать другие фильтры</p>
            </div>
            
        </div>
    );
};

export default BooksNotFound;