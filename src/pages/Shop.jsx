import React from 'react';

import BooksList from '../components/BooksList/BooksList';
import Filters from '../components/Filters/Filters';
import Sort from '../components/Sort/Sort';
import Search from '../components/Search/Search';
import Hook from '../components/Hooks/Hook';
import useBookFilters from '../components/useBookFilters/useBookFilters';

import './../index.css'

const Shop = ({ condition }) => {
    const { data, isLoading } = Hook();

    const {
        // originalItems,
        items,
        visibleItems,
        selectedGenres,
        isFilterOpen,
        isSortOpen,
        sortType,
        sortDirection,
        minAge,
        maxAge,
        minPrice,
        maxPrice,
        searchPlace,
        handleGenreChange,
        handleMinPriceChange,
        handleMaxPriceChange,
        handleMinAgeChange,
        handleMaxAgeChange,
        handleSearchChange,
        toggleFilter,
        toggleSort,
        handleSortChange,
        // filtersAndSortings,
        handleResetFilters,
        loadMoreBooks,
      } = useBookFilters(data, condition);

    return (
        <div className='wrapper' >
            <useBookFilters
                selectedGenres={selectedGenres}
                isFilterOpen={isFilterOpen}
                isSortOpen={isSortOpen}
                sortType={sortType}
                sortDirection={sortDirection}
                minAge={minAge}
                maxAge={maxAge}
                minPrice={minPrice}
                maxPrice={maxPrice}
                searchPlace={searchPlace}
                handleGenreChange={handleGenreChange}
                handleMinPriceChange={handleMinPriceChange}
                handleMaxPriceChange={handleMaxPriceChange}
                handleMinAgeChange={handleMinAgeChange}
                handleMaxAgeChange={handleMaxAgeChange}
                handleSearchChange={handleSearchChange}
                toggleFilter={toggleFilter}
                toggleSort={toggleSort}
                handleSortChange={handleSortChange}
                handleResetFilters={handleResetFilters}
                loadMoreBooks={loadMoreBooks}
                items={items}
                visibleItems={visibleItems}
                isLoading={isLoading}
        />
       <div className='search_place'>
        <Filters 
            selectedGenres={selectedGenres}
            onClickGenre={handleGenreChange}
            isOpen={isFilterOpen}
            toggleFilter={toggleFilter}
            minPrice={minPrice}
            maxPrice={maxPrice}
            minAge={minAge}
            maxAge={maxAge}
            onMinPriceChange={handleMinPriceChange}
            onMaxPriceChange={handleMaxPriceChange}
            onMinAgeChange={handleMinAgeChange}
            onMaxAgeChange={handleMaxAgeChange} 
            onResetFilters={handleResetFilters}
        />
        <Sort 
            onChangeSort={handleSortChange}
            isOpen={isSortOpen}
            toggleSort={toggleSort}
        />
        <Search onSearchChange={handleSearchChange} />
        </div>
        {isLoading ? (
            <BooksList items={[]} isLoading={isLoading} />
            ) : (
            <>
                <BooksList items={items.slice(0, visibleItems)} isLoading={isLoading} />
                {visibleItems < items.length && (
                    <div className="loadmore">
                        <button onClick={() => loadMoreBooks()}>Загрузить еще</button>
                    </div>
                )}
            </>
            )}
        </div>
                
    );
};

export default Shop;