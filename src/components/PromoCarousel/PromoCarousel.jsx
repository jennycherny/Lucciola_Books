import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hook from '../Hooks/Hook';
import './PromoCarousel.css'
import { MdNavigateNext } from "react-icons/md";

const PromoCarousel = ({ condition }) => {
    const { data, isLoading  } = Hook();
    
    const promoBooks = data.filter((book) => book.promo === true && book.condition === condition);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [startPosition, setStartPosition] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
  
    useEffect(() => {
        let interval;
    
        if (!isPaused && promoBooks.length > 1 && !isSwiping) {
            interval = setInterval(() => {
                setCurrentIndex((prevIndex) => {
                    const nextIndex = (prevIndex + 1) % promoBooks.length;
                    if (nextIndex === 0) {
                        clearInterval(interval); // Остановить интервал после достижения последнего элемента
                        setTimeout(() => {
                            startCarousel(); // Запустить карусель заново через некоторое время
                        }, 1500);
                    }
                    return nextIndex;
                });
            }, 1500);
        }
    
        return () => {
            clearInterval(interval);
        };
    }, [isPaused, promoBooks, isSwiping, currentIndex]);
    
    if (isLoading) {
        return null;
    }

    const startCarousel = () => {
        setCurrentIndex(0);
    };
    const handleMouseEnter = () => {
        setIsPaused(true);
    };
    
    const handleMouseLeave = () => {
        setIsPaused(false);
    };

    const handleStart = () => {
        setIsPaused(true);
        setStartPosition(currentIndex);
        setIsSwiping(true); // isSwiping в true при начале свайпа
    };

    const handleMouseUp = () => {
        setIsSwiping(false); // isSwiping в false при отпускании мыши
    };

    const handleTouchEnd = () => {
        setIsSwiping(false); // Устанавливаем isSwiping в false при окончании касания
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % promoBooks.length);
    };
    
    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + promoBooks.length) % promoBooks.length);
    };
  
    return (
        <div className='carousel-block'> 
            <button>
            <MdNavigateNext onClick={prevSlide} className='arrow' style={{ 
                fontSize: '3em', 
                color: '#2F2E41', 
                transform: 'rotate(180deg)'}}/>
            </button>
            <div className="carousel" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div 
                    className="carousel-container" 
                    style={{    transform: `translateX(-${currentIndex * (100 / promoBooks.length)}%)`, 
                                transition: 'transform 1s ease' 
                            }}
                            onMouseDown={handleStart}
                            onTouchStart={handleStart}
                            onMouseUp={handleMouseUp}
                            onTouchEnd={handleTouchEnd} 
                >
                {promoBooks.map((book) => (
                    <div className='item' key={book.id}>
                    <Link 
                        to={`/${condition === 'Новая' ? 'shop' : 'library'}/${book.id}`} 
                        className='cards-link'>                        
                        <img src={book.img} alt='Обложка книги' className='book-item-img' />
                        <div className='cardText'>
                            <h4 className='title'>{book.title}</h4>
                            <h5 className='author'>{book.author}</h5>
                        </div>
                    </Link>
                    </div>
                ))}
                </div>
            </div>
            <button>
            <MdNavigateNext onClick={nextSlide} className='arrow' style={{ fontSize: '3em', color: '#2F2E41'}}/>
            </button>
        </div>
    );
};

export default PromoCarousel;