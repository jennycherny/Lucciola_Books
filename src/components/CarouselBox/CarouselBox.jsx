import React from 'react';
import { Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import './CarouselBox.css'

import carouselImg from './../../assets/img1.jpg'
import carouselImgTwo from './../../assets/img2.jpg'
import carouselImgThree from './../../assets/img3.jpg'


const CarouselBox = () => {
        return (
            <div>
                <Carousel fade>
                    <Carousel.Item interval={3000}>
                        <img
                            className='d-block w-100'
                            src={ carouselImg }
                            alt='books'
                        />
                        <Carousel.Caption id='carousel-content-first-slide'>
                        <h2 id='carousel-text'>Популярные книги на русском языке с доставкой по всей Грузии
                        </h2>
                            <Button
                            id='carousel-btn'
                            variant="outline-light" 
                            className="mb-2" size="lg"
                            >
                            Перейти в магазин
                            </Button>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={3000}>
                        <img
                            className='d-block w-100'
                            src={ carouselImgTwo }
                            alt='books'
                        />
                        <Carousel.Caption id='carousel-content-second-slide'>
                        <h3 id='carousel-text'>Единственная в Тбилиси библиотека с литературой на русском, английском и итальянском языке
                        </h3>
                        <Button
                            id='carousel-btn'
                            variant="outline-light" 
                            className="mb-2" size="lg"
                            >Перейти в библиотеку</Button>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={3000}>
                        <img
                            className='d-block w-100'
                            src={ carouselImgThree }
                            alt='books'
                        />
                        <Carousel.Caption id='carousel-content-third-slide'>
                        <h3 id='carousel-text'>Доставка любых книг со всего мира по предзаказу в течение месяца
                        </h3>
                        <Button
                            id='carousel-btn'
                            variant="outline-light" 
                            className="mb-2" size="lg"
                            >Сделать предзаказ</Button>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }

export default CarouselBox;