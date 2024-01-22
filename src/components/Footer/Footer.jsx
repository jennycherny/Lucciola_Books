import React from 'react';
import './Footer.css';

import { FaInstagram } from "react-icons/fa6";
import { PiTelegramLogo } from "react-icons/pi";
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md"; 

const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer__container">
                {/* <div className="footer__socialmedia">
                    <a href="https://www.instagram.com/lucciola.books/" target="_blank" rel="noreferrer">
                        <FaInstagram size={18} className='footer-icon'/>
                    </a>  
                    <a href="https://t.me/lucciola_books" target="_blank" rel="noreferrer" className='footer-icon'>
                        <PiTelegramLogo size={18}/>
                    </a>
                    <a href="tel:+995599700895" target="_blank" rel="noreferrer" className='footer-icon'>
                        <MdOutlinePhone size={18}/>
                    </a>
                    <a href="mailto:lucciola.books@gmail.com"target="_blank" rel="noreferrer" className='footer-icon'>
                        <MdOutlineMail size={18}/>
                    </a>
                </div> */}
                <div className="footer__info">
                    <div className="footer__sections">
                        <a href="/about" className="footer-item">О нас</a>
                        <a href="/shop" className="footer-item">Магазин</a>
                        <a href="/library" className="footer-item">Библиотека</a>
                        <a href="/preorder" className="footer-item">Предзаказ</a>
                        
                        <div className="footer__socialmedia">
                            <a href="https://www.instagram.com/lucciola.books/" target="_blank" rel="noreferrer">
                                <FaInstagram size={18} className='footer-icon'/>
                            </a>  
                            <a href="https://t.me/lucciola_books" target="_blank" rel="noreferrer" className='footer-icon'>
                                <PiTelegramLogo size={18}/>
                            </a>
                            <a href="tel:+995599700895" target="_blank" rel="noreferrer" className='footer-icon'>
                                <MdOutlinePhone size={18}/>
                            </a>
                            <a href="mailto:lucciola.books@gmail.com"target="_blank" rel="noreferrer" className='footer-icon'>
                                <MdOutlineMail size={18}/>
                            </a>
                        </div>
                    </div>
                    <div className="footer__law">
                        <a href="#" className="footer-item low">Пользовательское <br />соглашение</a>
                        <a href="#" className="footer-item low">Политика <br /> конфиденциальности</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;