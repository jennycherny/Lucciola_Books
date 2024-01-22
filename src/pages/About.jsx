import React from 'react';
import AboutTabs from '../components/AboutTabs/AboutTabs';
import './css/About.css'

import aboutFrame from './../assets/frame_4.svg'
import deliveryFrame from './../assets/frame_5.svg'
import smFrame from './../assets/frame_6.svg'
import review1 from './../assets/review1.jpeg'
import review2 from './../assets/review2.png'

import { CiDeliveryTruck } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa6";
import { PiTelegramLogo } from "react-icons/pi";
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md"; 
import Footer from '../components/Footer/Footer';

const About = () => {
    return (
        <div>
            <div className='about__container'>
                <div className='about__block'>
                    <h1>
                        <span>Lucciola Books</span> — это библиотека в Тбилиси <br />и онлайн-магазин книг с доставкой по Грузии
                    </h1>
                    <img src={aboutFrame} alt="" />
                </div>

                <AboutTabs/> 

                <div className="delivery__block">
                    <h1>
                        <span>Доставка и оплата</span>
                    </h1>
                    <div className="delivery__info">
                        <img src={deliveryFrame} alt="" />
                        <div>
                            <p>Библиотека доступна только в Тбилиси, книги из магазина отправляем по всей Грузии</p>
                            <p><CiDeliveryTruck size={18} className='truck-icon'/> Самовывоз — от станции метро «Исани», бесплатно </p>
                            <p><CiDeliveryTruck size={18} className='truck-icon'/> Доставка по Тбилиси — 5 GEL, срок — 1 день</p>
                            <p><CiDeliveryTruck size={18} className='truck-icon'/> Доставка по Грузии — по срокам и тарифам почтовой компании</p>
                            <p>Оплата наличными или переводом на банковскую карту</p>
                        </div>
                    </div>
                </div>

                <div className="reviews__block">
                    <h1>
                        <span>Отзывы</span>
                    </h1>
                    <div className="reviews__items">
                        <div className="reviews_item">
                            <p>Долго не могла найти в Грузии Пелевина на русском языке. Наткнулась на этот магазин и закупилась сразу тремя книгами.Все понравилось, доставка быстрая, книги в идеальном состоянии. Спасибо!</p>
                            <h4>Катя, Рустави</h4>
                            <img src={review1} alt="" />
                        </div>
                        <div className="reviews_item">
                            <p>Я обращаюсь в библиотеку уже второй месяц. Нравится, что есть дедлайн, до которого я должна дочитать книгу. Это реально помогает читать чаще! Открыла для себя парочку новых авторов. В общем, одни плюсы😛</p>
                            <h4>Лина, Тбилиси</h4>
                            <img src={review2} alt="" />
                        </div>
                    </div>
                </div>


                <div className="socialmedia">
                    <div className="socialmedia__block">
                        <div className="socialmedia__instagram__block">
                            <h2>Подпишись и будь в курсе новостей</h2>
                            <button>
                                <a href="https://www.instagram.com/lucciola.books/" target="_blank" rel="noreferrer"><FaInstagram size={22} className='instagram'/>
                                Instagram
                                </a>  
                            </button>
                        </div>
                        <div className="socialmedia__feedback">
                            <h2>Для обратной связи</h2>
                            <div className="socialmedia__icons">
                                <button className='feedback__button'>
                                    <a href="https://t.me/lucciola_books" target="_blank" rel="noreferrer" 
                                className='telegram'><PiTelegramLogo size={24}/></a>
                                </button>
                                <button className='feedback__button'>
                                    <a href="tel:+995599700895" target="_blank" rel="noreferrer"
                                    className='phone'><MdOutlinePhone size={24}/></a>
                                </button>
                                <button className='feedback__button'>
                                    <a href="mailto:lucciola.books@gmail.com"target="_blank" rel="noreferrer"
                                    className='mail'><MdOutlineMail size={24}/></a>
                                </button>
                                
                            </div>
                        </div>
                        
                    </div>
                       <img src={smFrame} alt="" /> 
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default About;