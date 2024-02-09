import React from 'react';
import SingleLibraryBookItem from '../SingleLibraryBookItem/SingleLibraryBookItem';

import '../BooksList/BooksList.css';
import Skeleton from '../SingleBookItem/Skeleton';

const LibraryBooksList = ({ items, isLoading }) => {
    console.log(items);

    return (
        <div>
            <main> 
                <div className='books-list'>
                    {isLoading ? (
                        [...new Array(4)].map((_, index) => <Skeleton key={index} />)
                    ) : (
                        items.length > 0 ? (
                            items.map((book) => <SingleLibraryBookItem key={book.id} book={book} />)
                        ) : null
                    )} 
                </div>
            </main>
        </div>
    );
};

export default LibraryBooksList;