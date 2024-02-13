import React, { useState } from 'react';
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

    const uniqueGenres = [...new Set(booksData.filter(book => book.category && book.category.trim() !== '').map(book => book.category))];
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
                    className={open ? 'rotated' : 'notRotated'}
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path  stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                </svg>

                <span  className="filter__text" >Фильтры</span>
            </div>
            {open && (
                <div className='filter__popup' onClick={(e) => e.stopPropagation()}>
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
                        <div className='popup__buttons'>
                            <button 
                                onClick={handleResetFilters}
                            >
                                <svg width="15px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                                <span className='reset'>Сбросить все</span>
                            </button> 
                            <button 
                                onClick={()=> setOpen(!open)}
                                >
                                <svg width="15px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>

                                <span className='reset'>Закрыть</span>
                            </button> 
                        </div>
                    

                    </div>
                    
            </div> 
            )}
            {open && <div className="overlay" onClick={() => setOpen(false)}></div>}
        </div>
    );
};

export default Filters;