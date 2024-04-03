import React from 'react';
import Hook from '../components/Hooks/Hook';
import BooksList from '../components/BooksList/BooksList';
import Filters from '../components/Filters/Filters';
import Sort from '../components/Sort/Sort';
import Search from '../components/Search/Search';
import ShopSectionButtons from '../components/ShopSectionButtons/ShopSectionButtons';
import useBookFilters from '../components/useBookFilters/useBookFilters';
import Footer from '../components/Footer/Footer';

const ShopBooks = ({ selectedSection, toggleSection }) => {
    const { data, isLoading } = Hook();
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
    
    return (
        <div className="shop__container">
            <div className='shop__wrapper' >
                <ShopSectionButtons 
                    selectedSection={selectedSection}
                    toggleSection={toggleSection}
                />

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

                <BooksList 
                        items={bookItems.slice(0, bookVisibleItems)}
                        isLoading={isLoading}
                />

                {(
                    bookVisibleItems < bookItems.length && (
                        <div className="loadmore">
                            <button onClick={() => loadMoreBookItems()}>Загрузить еще</button>
                        </div>
                    )
                )}
            </div>
            <Footer/>
        </div>



        // <div>
        //     <div className='search_place'>
        //     <Filters 
        //         selectedGenres={bookSelectedGenres}
        //         onClickGenre={handleBookGenreChange}
        //         isOpen={isBookFilterOpen}
        //         toggleFilter={toggleBookFilter}
        //         minPrice={bookMinPrice}
        //         maxPrice={bookMaxPrice}
        //         minAge={bookMinAge}
        //         maxAge={bookMaxAge}
        //         onMinPriceChange={handleBookMinPriceChange}
        //         onMaxPriceChange={handleBookMaxPriceChange}
        //         onMinAgeChange={handleBookMinAgeChange}
        //         onMaxAgeChange={handleBookMaxAgeChange}
        //         onResetFilters={handleBookResetFilters}
        //     />
        //     <Sort 
        //         onChangeSort={handleBookSortChange}
        //         isOpen={isBookSortOpen}
        //         toggleSort={toggleBookSort}
        //     />
        //     <Search onSearchChange={handleBookSearchChange} />
        //     </div>

        //     <BooksList 
        //             items={bookItems.slice(0, bookVisibleItems)}
        //             isLoading={isLoading}
        //     />

        //     {(
        //         bookVisibleItems < bookItems.length && (
        //             <div className="loadmore">
        //                 <button onClick={() => loadMoreBookItems()}>Загрузить еще</button>
        //             </div>
        //         )
        //     )}
            
        // </div>
    );
};

export default ShopBooks;