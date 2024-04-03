import React from 'react';
import { useNavigate } from "react-router-dom";

import Hook from '../components/Hooks/Hook';
import ShopSectionButtons from '../components/ShopSectionButtons/ShopSectionButtons';
import GiftsFilters from '../components/GiftsFilters/GiftsFilters';
import useGiftsFilters from '../components/useGiftsFilters/useGiftsFilters';
import Sort from '../components/Sort/Sort';
import Search from '../components/Search/Search';
import BooksList from '../components/BooksList/BooksList';
import Footer from '../components/Footer/Footer';

const ShopGifts = ({ selectedSection, toggleSection }) => {
    const { data, isLoading } = Hook();

    console.log('Data in ShopGifts:', data);
    console.log('isLoading in ShopGifts:', isLoading);
    console.log(selectedSection);

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
            <div className='shop__wrapper' >
            <ShopSectionButtons 
                selectedSection={selectedSection}
                toggleSection={toggleSection}
            />

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
                <Search 
                    onSearchChange={handleGiftSearchChange} 
                />
            </div>

            <BooksList 
                items={giftItems.slice(0, giftVisibleItems)}
                isLoading={isLoading}
            />

            {(
                giftVisibleItems < giftItems.length && (
                    <div className="loadmore">
                        <button onClick={() => loadMoreGiftItems()}>Загрузить еще</button>
                    </div>
                )
            )}
        </div>
        <Footer/>
        </div>
    );
};

export default ShopGifts;