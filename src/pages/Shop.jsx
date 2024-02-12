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

    const {
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

    // const {
    //     items,
    //     visibleItems,
    //     selectedGenres,
    //     isFilterOpen,
    //     isSortOpen,
    //     minAge,
    //     maxAge,
    //     minPrice,
    //     maxPrice,
    //     handleGenreChange,
    //     handleMinPriceChange,
    //     handleMaxPriceChange,
    //     handleMinAgeChange,
    //     handleMaxAgeChange,
    //     handleSearchChange,
    //     toggleFilter,
    //     toggleSort,
    //     handleSortChange,
    //     handleResetFilters,
    //     loadMoreBooks,
    //   } = useBookFilters(data, selectedSection === 'books' ? 'Новая' : 'Подарки');



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
                {selectedSection === 'books' && (
                    <>
                        <div className='search_place'>
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
                            <Sort 
                                onChangeSort={handleBookSortChange}
                                isOpen={isBookSortOpen}
                                toggleSort={toggleBookSort}
                            />
                            <Search onSearchChange={handleBookSearchChange} />
                        </div>
                    {isLoading ? (
                        <BooksList items={[]} isLoading={isLoading} />
                        ) : (
                        <>
                            <BooksList items={bookItems.slice(0, bookVisibleItems)} isLoading={isLoading} />
                            {bookVisibleItems < bookItems.length && (
                                <div className="loadmore">
                                    <button onClick={() => loadMoreBookItems()}>Загрузить еще</button>
                                </div>
                            )}
                        </>
                        )}
                    </>
                )}
                {selectedSection === 'gifts' && (
                    <>
                    <div className='search_place'>
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
                        <Sort 
                            onChangeSort={handleGiftSortChange}
                            isOpen={isGiftSortOpen}
                            toggleSort={toggleGiftSort}
                        />
                        <Search onSearchChange={handleGiftSearchChange} />
                        </div>
                    {isLoading ? (
                        <BooksList items={[]} isLoading={isLoading} />
                        ) : (
                        <>
                            <BooksList items={giftItems.slice(0, giftVisibleItems)} isLoading={isLoading} />
                            {giftVisibleItems < giftItems.length && (
                                <div className="loadmore">
                                    <button onClick={() => loadMoreGiftItems()}>Загрузить еще</button>
                                </div>
                            )}
                        </>
                        )}
                    </>
                )} 
                
            </div>
        <Footer/>
        </div>
                
    );
};

export default Shop;