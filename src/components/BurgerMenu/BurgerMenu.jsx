import React from 'react';
import { useCart } from '../Providers/CartProvider';
import './BurgerMenu.css';

const BurgerMenu = ({ isOpen, handleToggle }) => {
  const { totalCartItems } = useCart(); 
    return (
      <div className={`burger-menu ${isOpen ? 'open' : ''}`}>
        <div className="burger-icon" onClick={handleToggle}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <div className="menu-content">
          <ul className="menu-list">
            <li><a href="/about" className="nav-item">О нас</a></li>
            <li><a href="/shop" className="nav-item">Магазин</a></li>
            <li><a href="/library" className="nav-item">Библиотека</a></li>
            <li><a href="/preorder" className="nav-item" id='nav-item'>Предзаказ</a></li>
            <li>
              {/* <a href="/cart" className="nav-item" id='nav-item'>
                <div className="nav-item">
                  <svg width="20px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                  <span>Корзина</span>
                </div>
              </a> */}
              <a href="/cart" className="nav-item" id='nav-item'>
                <div className="cart-item-container">
                  <div className="cart-item">
                    <div>
                      <svg width="20px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                      </svg>
                    </div>
                    {totalCartItems > 0 && (
                      <div className="cart-counter">{totalCartItems}</div>
                      )}
                  </div>
                  <span>Корзина</span>
                </div>
            </a>
            </li>
          </ul>
        </div>
      </div>
    );
  };

export default BurgerMenu;