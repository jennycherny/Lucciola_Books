import React, { useState, useEffect } from 'react';
import Hook from '../Hooks/Hook';
import './Filters.css'

const Filters = ({ 
    selectedGenres, 
    onClickGenre, 
    onMinPriceChange, 
    onMaxPriceChange, 
    minAge,
    maxAge,
    onMinAgeChange,
    onMaxAgeChange,
    onResetFilters, 
}) => {

    const { data } = Hook();
    const booksData = data;
    
    const [open, setOpen] = useState(false);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const uniqueGenres = [...new Set(booksData.map(book => book.category))];
    // получаем ['Художественная литература', 'Биография', 'Психология', 'Искусство', 'Архитектура', 'Детская литература']

    const handleMinPriceChange = (event) => {
        const inputValue = event.target.value; 

        if (/^\d*$/.test(inputValue)) {
            console.log("Min Price Change:", inputValue);
            setMinPrice(inputValue);
            onMinPriceChange(inputValue);
        } else {
            setMinPrice('');
        }
    };

    const handleMaxPriceChange = (event) => {
        const inputValue = event.target.value;
        
        if (/^\d*$/.test(inputValue)) {
            console.log("Max Price Change:", inputValue);
            setMaxPrice(inputValue);
            onMaxPriceChange(inputValue);
        } else {
            setMaxPrice('');
        }
    };

    const handleMinAgeChange = (event) => {
        const inputValue = event.target.value;
    
        if (/^\d*$/.test(inputValue)) {
          console.log("Min Age Change:", inputValue);
          onMinAgeChange(inputValue);
        } else {
          onMinAgeChange('');
        }
      };

    const handleMaxAgeChange = (event) => {
        const inputValue = event.target.value;

        if (/^\d*$/.test(inputValue)) {
            console.log("Max Age Change:", inputValue);
            onMaxAgeChange(inputValue);
        } else {
            onMaxAgeChange('');
        }
        };
    
    const handleResetFilters = () => {
        // Сбросить все фильтры
        onClickGenre([]); 
        onMinPriceChange(''); 
        onMaxPriceChange(''); 
        onMinAgeChange(''); 
        onMaxAgeChange(''); 
        setOpen(false);

        onResetFilters();
      };

    return (
        <div className='filter'>
            <div className='filter__label' onClick={() => setOpen(!open)}>
                <svg 
                    className={open ? 'rotated' : 'notRoated'}
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16"  
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke-width="1.5" 
                    stroke="currentColor" 
                    class="w-6 h-6">
                    <path fill="#625F60" stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                </svg>
                Фильтры
            </div>
            {open && (
                <div className='filter__popup'>
                    <div className='popup__frst__column'>
                        <b>Категория</b>
                        <ul>
                        
                        {uniqueGenres.map((genre) => (
                            <li
                                key={genre} 
                                onClick={() =>{ 
                                    onClickGenre(genre);
                                }} 
                                className={selectedGenres && selectedGenres.includes(genre) ? 'active' : ''}
                            >
                                <input 
                                    type="checkbox" 
                                    className='checkbox'
                                    checked={selectedGenres && selectedGenres.includes(genre)}
                                    onChange={() => onClickGenre(genre)}
                                    onClick={() => onClickGenre(genre)} 
                                />
                                <span>{genre}</span>
                            </li>
                            ))}
                        </ul>
                    </div>
                    <div className='popup__scnd__column'>
                        <div className='range'>
                            <div className='range__name'>Цена</div>
                            <div className='range__input'>
                                <div className='fromTo'>от</div>
                                <input 
                                    type="text" 
                                    placeholder='0 gel' 
                                    className='input'
                                    value={minPrice}
                                    onChange={handleMinPriceChange}
                                />
                                <div className='fromTo'>до</div>
                                <input 
                                    type="text" 
                                    placeholder='0 gel' 
                                    className='input'
                                    value={maxPrice}
                                    onChange={handleMaxPriceChange}
                                />
                            </div>
                        </div>
                        <div className='range'>
                            <div className='range__name'>Возраст</div>
                            <div className='range__input'>
                                <div className='fromTo'>от</div>
                                <input 
                                    type="text" 
                                    placeholder='0 лет' 
                                    className='input'
                                    value={minAge}   // Устанавливаем значение minAge
                                    onChange={handleMinAgeChange}
                                />
                                <div className='fromTo'>до</div>
                                <input 
                                    type="text" 
                                    placeholder='0 лет' 
                                    className='input'
                                    value={maxAge}   // Устанавливаем значение maxAge
                                    onChange={handleMaxAgeChange}
                                />
                            </div>
                        </div>
                        {/* <div 
                            className='inStock range'
                        >
                            <input 
                                type="checkbox"     
                            /> 
                            <div className='inStock__name'>В наличии</div>
                        </div> */}

                        <div className='popup__buttons'>
                            <button 
                                onClick={handleResetFilters}
                            >
                                Сбросить все
                            </button> 
                        </div>
                    

                    </div>
                    
            </div> 
            )}
        </div>
    );
};

export default Filters;