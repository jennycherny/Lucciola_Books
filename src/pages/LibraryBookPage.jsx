import React from 'react';
import { useParams } from 'react-router';

const LibraryBookPage = () => {
    const { bookId } = useParams();
    
    return (
        <div>
            LibraryBookPage
            <p>Book ID: {bookId}</p>
        </div>
    );
};

export default LibraryBookPage;