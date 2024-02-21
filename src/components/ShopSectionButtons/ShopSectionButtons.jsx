import React from 'react';
import { Link } from 'react-router-dom';
import { IoBookOutline } from "react-icons/io5";
import { GoGift } from "react-icons/go";

const ShopSectionButtons = ({ selectedSection, toggleSection }) => {
    return (
        <div className="shop-section-buttons">
            <div className="section-button">
                <Link to="/shop" onClick={() => toggleSection('books')}>
                    <button className={selectedSection === 'books' ? 'active' : ''}>
                        <IoBookOutline size={16}/>
                        <span>Книги</span>
                    </button>
                </Link>
            </div>
            <div className="section-button">
                <Link to="/shop/gifts" onClick={() => toggleSection('gifts')}>
                    <button className={selectedSection === 'gifts' ? 'active' : ''}>
                        <GoGift size={16}/>
                        <span>Подарки</span>
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ShopSectionButtons;