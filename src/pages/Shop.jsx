import React, { useState } from 'react';

import BooksList from '../components/BooksList/BooksList';
import Filters from '../components/Filters/Filters';
import GiftsFilters from '../components/GiftsFilters/GiftsFilters';
import Sort from '../components/Sort/Sort';
import Search from '../components/Search/Search';
import Hook from '../components/Hooks/Hook';
import useBookFilters from '../components/useBookFilters/useBookFilters';
import useGiftsFilters from '../components/useGiftsFilters/useGiftsFilters';
import Footer from '../components/Footer/Footer';

import './../index.css';
import './css/Shop.css';

import { IoBookOutline } from "react-icons/io5";
import { GoGift } from "react-icons/go";

const Shop = () => {
    const { data, isLoading } = Hook();
    const [selectedSection, setSelectedSection] = useState('books');

    const toggleSection = (section) => {
        setSelectedSection(section);
    };

    const isGiftsSection = selectedSection === 'gifts';

    const {
        visibleItems,
        items: bookItems,
        visibleItems: bookVisibleItems,
        isFilterOpen: isBookFilterOpen,
        isSortOpen: isBookSortOpen,
        minPrice: bookMinPrice,
        maxPrice: bookMaxPrice,
        minAge: bookMinAge,
        maxAge: bookMaxAge,
        selectedGenres: bookSelectedGenres,
        handleGenreChange: handleBookGenreChange,
        handleMinPriceChange: handleBookMinPriceChange,
        handleMaxPriceChange: handleBookMaxPriceChange,
        handleMinAgeChange: handleBookMinAgeChange,
        handleMaxAgeChange: handleBookMaxAgeChange,
        handleSearchChange: handleBookSearchChange,
        toggleFilter: toggleBookFilter,
        toggleSort: toggleBookSort,
        handleSortChange: handleBookSortChange,
        handleResetFilters: handleBookResetFilters,
        loadMoreBooks: loadMoreBookItems,
      } = useBookFilters(data, 'Новая');

    const {
        items: giftItems,
        visibleItems: giftVisibleItems,
        isFilterOpen: isGiftFilterOpen,
        isSortOpen: isGiftSortOpen,
        minPrice: giftMinPrice,
        maxPrice: giftMaxPrice,
        giftsCategory: selectedGiftCategory,
        handleGenreChange: handleGiftGenreChange,
        handleMinPriceChange: handleGiftMinPriceChange,
        handleMaxPriceChange: handleGiftMaxPriceChange,
        handleSearchChange: handleGiftSearchChange,
        toggleFilter: toggleGiftFilter,
        toggleSort: toggleGiftSort,
        handleSortChange: handleGiftSortChange,
        handleResetFilters: handleGiftResetFilters,
        loadMoreBooks: loadMoreGiftItems,
      } = useGiftsFilters(data, 'Подарки');

    return (
        <div className="shop__container">
            <div className='wrapper' >
                <div className="shop-section-buttons">
                        <div className="section-button">
                            <button onClick={() => toggleSection('books')} className={selectedSection === 'books' ? 'active' : ''}>
                                <IoBookOutline size={16}/>
                                <span>Книги</span>
                            </button>
                        </div>
                        <div className="section-button">
                        <button onClick={() => toggleSection('gifts')} className={selectedSection === 'gifts' ? 'active' : ''}>
                                <GoGift size={16}/>
                                <span>Подарки</span>
                            </button>
                        </div>
                </div>
                <div className='search_place'>
                    {isGiftsSection ? (
                        <GiftsFilters  
                            giftsCategory={selectedGiftCategory}
                            onClickGenre={handleGiftGenreChange}
                            isOpen={isGiftFilterOpen}
                            toggleFilter={toggleGiftFilter}
                            minPrice={giftMinPrice}
                            maxPrice={giftMaxPrice}
                            onMinPriceChange={handleGiftMinPriceChange}
                            onMaxPriceChange={handleGiftMaxPriceChange}
                            onResetFilters={handleGiftResetFilters}
                        />
                    ) : (
                        <Filters 
                            selectedGenres={bookSelectedGenres}
                            onClickGenre={handleBookGenreChange}
                            isOpen={isBookFilterOpen}
                            toggleFilter={toggleBookFilter}
                            minPrice={bookMinPrice}
                            maxPrice={bookMaxPrice}
                            minAge={bookMinAge}
                            maxAge={bookMaxAge}
                            onMinPriceChange={handleBookMinPriceChange}
                            onMaxPriceChange={handleBookMaxPriceChange}
                            onMinAgeChange={handleBookMinAgeChange}
                            onMaxAgeChange={handleBookMaxAgeChange}
                            onResetFilters={handleBookResetFilters}
                        />
                    )}
                    <Sort 
                        onChangeSort={isGiftsSection ? handleGiftSortChange : handleBookSortChange}
                        isOpen={isGiftsSection ? isGiftSortOpen : isBookSortOpen}
                        toggleSort={isGiftsSection ? toggleGiftSort : toggleBookSort}
                    />
                    <Search onSearchChange={isGiftsSection ? handleGiftSearchChange : handleBookSearchChange} />
                </div>
                <BooksList 
                    items={isGiftsSection ? giftItems.slice(0, giftVisibleItems) : bookItems.slice(0, bookVisibleItems)}
                    isLoading={isLoading}
                    isGiftsSection={isGiftsSection}
                />
                {isGiftsSection && (
                    giftVisibleItems < giftItems.length && (
                        <div className="loadmore">
                            <button onClick={() => loadMoreGiftItems()}>Загрузить еще</button>
                        </div>
                    )
                )}
                {!isGiftsSection && (
                    bookVisibleItems < bookItems.length && (
                        <div className="loadmore">
                            <button onClick={() => loadMoreBookItems()}>Загрузить еще</button>
                        </div>
                    )
                )}
                
            </div>
        <Footer/>
        </div>
                
    );
};

export default Shop;