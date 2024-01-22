import React from 'react';
import PromoCarousel from '../components/PromoCarousel/PromoCarousel';
import Footer from '../components/Footer/Footer';
import './css/Home.css'
import shopFrame from './../assets/frame_1.svg'
import libraryFrame from './../assets/frame_2.svg'
import orderFrame from './../assets/frame_3.svg'


const Home = () => {
        return (
        <div>
            <div className='home__container'>
                <div className='shop__block'>
                    <div className='shop__block__text'>
                        <h1>
                            Популярные книги на русском языке <br />с доставкой <span>по всей Грузии</span>
                        </h1>
                        <p>
                            <a href="/shop" className='home-button'>
                                Перейти в магазин
                            </a> 
                        </p>
                        
                    </div>
                    <img src={shopFrame} alt=''/>
                </div>
                <div className='promo-carousel'>
                    <h2 id='shop-promo'>Новинки месяца</h2>
                    <PromoCarousel condition="Новая"/>
                </div>  
                <div className='library__block'>
                    <img src={libraryFrame} alt=''/>
                    <div className='library__block__text'>
                        <h1>
                        Единственная в Тбилиси библиотека <br />с литературой на <span>русском</span>,<br /> <span>английском</span> и <br /><span>итальянском </span><br />языке
                        </h1>
                        <p>
                            <a href="/library" className='home-button'>
                                Перейти в библиотеку
                            </a> 
                        </p>
                    </div>
                </div>
                <div className='promo-carousel'>
                    <h2 id='shop-promo'><span>Нестареющая классика</span></h2>
                    <PromoCarousel condition="Б/У"/>
                </div> 
                <div className='order__block'>
                    <div className='order__block__text'>
                        <h1>
                            Доставка любимых книг <br />по предзаказу <span>в течение месяца</span>
                        </h1>
                        <div className='order__buttons'>
                            <p>
                                <a href="/order" className='home-button'>
                                    Перейти к предзаказу
                                </a> 
                            </p>
                            <p>
                                <a href="/about" className='home-button'>
                                    Узнать о доставке
                                </a> 
                            </p>
                        </div>    
                    </div>
                    <img src={orderFrame} alt=''/>
                </div>
            </div>
        <Footer/>
        </div>
        );
}

export default Home;