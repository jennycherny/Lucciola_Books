import React, { useState } from "react";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import './Header.css';
import logo from '../../assets/icon.webp';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <img
            src={logo}
            height="30"
            width="30"
            alt="logo"
            id='logo'
          />
          <a href="/" className="name-of-site">
            Lucciola Books
          </a>
        </div>

        <div className="burger-icon-header" onClick={handleToggle}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <BurgerMenu isOpen={isOpen} handleToggle={handleToggle} />

        <nav className={`navbar ${isOpen ? "open" : ""}`}>
          <a href="/about" className="nav-item" id='nav-item'>
            <div className="nav-item">
            <svg width="20px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          </div>
          </a>
          <a href="/about" className="nav-item" id='nav-item'>О нас</a>
          <a href="/shop" className="nav-item" id='nav-item'>Магазин</a>
          <a href="/library" className="nav-item" id='nav-item'>Библиотека</a>
          <a href="/preorder" className="nav-item" id='nav-item'>Предзаказ</a>
        </nav>

        <nav className='navbar-dekstop'>
          <a href="/about" className="nav-item" id='nav-item'>
            <div className="nav-item">
            <svg width="20px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          </div>
          </a>
          <a href="/about" className="nav-item" id='nav-item'>О нас</a>
          <a href="/shop" className="nav-item" id='nav-item'>Магазин</a>
          <a href="/library" className="nav-item" id='nav-item'>Библиотека</a>
          <a href="/preorder" className="nav-item" id='nav-item'>Предзаказ</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;