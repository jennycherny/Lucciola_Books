import React from 'react';
import { useParams } from 'react-router';

const ShopBookPage = () => {
    const { bookId } = useParams();

    return (
        <div>
            ShopBookPage
            <p>Book ID: {bookId}</p>
        </div>
    );
};

export default ShopBookPage;