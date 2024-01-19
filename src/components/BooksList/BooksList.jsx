import React from 'react';
import SingleBookItem from '../SingleBookItem/SingleBookItem';

import './BooksList.css'
import Skeleton from '../SingleBookItem/Skeleton';

const BooksList = ({ items, isLoading }) => {
    console.log(items);

    return (
        <div>
            <main> 
                <div className='books-list'>
                    {isLoading ? (
                        [...new Array(20)].map((_, index) => <Skeleton key={index} />)
                    ) : (
                        items.length > 0 ? (
                            items.map((book) => <SingleBookItem key={book.id} book={book} />)
                        ) : null
                    )}
                </div>
            </main>
        </div>
    );
};
export default BooksList;