import React from 'react';
import './BurgerMenu.css';

const BurgerMenu = ({ isOpen, handleToggle }) => {
    return (
      <div className={`burger-menu ${isOpen ? 'open' : ''}`} onClick={handleToggle}>
        <div className="burger-icon">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <ul className="menu-items">
          <li><a href="/about" className="nav-item">О нас</a></li>
          <li><a href="/shop" className="nav-item">Магазин</a></li>
          <li><a href="/library" className="nav-item">Библиотека</a></li>
        </ul>
      </div>
    );
  };

export default BurgerMenu;