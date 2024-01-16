import React from 'react';
import SingleLibraryBookItem from '../SingleLibraryBookItem/SingleLibraryBookItem';

import '../BooksList/BooksList.css';
import Skeleton from '../SingleBookItem/Skeleton';

const LibraryBooksList = ({ items, isLoading }) => {
    console.log(items);

    return (
        <div>
            <main> 
                {isLoading ? (
                    [...new Array(20)].map((_, index) => <Skeleton key={index} />)
                ) : (
                    items.length > 0 ? (
                        items.map((book) => <SingleLibraryBookItem key={book.id} book={book} />)
                    ) : null
                )} 
            </main>
        </div>
    );
};

export default LibraryBooksList;