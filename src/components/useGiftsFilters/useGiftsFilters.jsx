import { useState, useEffect, useCallback } from 'react';

const useGiftsFilters = (data, condition) => {
    const [originalItems, setOriginalItems] = useState([]);
    const [items, setItems] = useState([]);
    const [visibleItems, setVisibleItems] = useState(24); // Количество загруженных книг
    
    const [isFiltersOpen, setIsFiltersOpen] = useState(false); ////состояние выпадающего списка фильтров
    const [giftsCategory, setGiftsCategory] = useState([]); //фильтрация по жанрам
    const [isFilterOpen, setIsFilterOpen] = useState(false); //состояние выпадающего списка фильтров

    const [isSortOpen, setIsSortOpen] = useState(false); //состояние выпадающего списка сортировки
    const [sortType, setSortType] = useState('по новизне'); // сортировка
    const [sortDirection, setSortDirection] = useState('desc'); //направления сортировки

    const [minPrice, setMinPrice] = useState(''); // Состояние для минимальной цены
    const [maxPrice, setMaxPrice] = useState(''); // Состояние для максимальной цены 

    const [searchPlace, setSearchPlace] = useState('');//Состояние для поисковой строки

    useEffect(() => {
        if (data) {
          console.log('Data in useGiftsFilters:', data);
          console.log('Condition in useGiftsFilters:', condition);
          
          const filteredData = data.filter((book) => book.stock > 0);
          setOriginalItems(filteredData);
          setItems(filteredData);
        }
      }, [data, condition]);

const filtersAndSortings = useCallback((genres, min, max, search) => {

    let filteredItems = originalItems.slice();
  
    // Фильтрация по жанру
    if (genres.length > 0) {
      filteredItems = filteredItems.filter((book) => genres.includes(book.giftsCategory));
    }
  
    // Фильтрация по цене
    if (min !== '' || max !== '') {
      filteredItems = filteredItems.filter((book) => {
        const price = book.price;
  
        if (min !== '' && max !== '') {
          return price >= parseInt(min, 10) && price <= parseInt(max, 10);
        } else if (min !== '') {
          return price >= parseInt(min, 10);
        } else if (max !== '') {
          return price <= parseInt(max, 10);
        }
  
        return true;
      });
    }
  
    // Поиск
    if (search !== '') {
        filteredItems = filteredItems.filter((book) => {
            const title = (book.title || '').toLowerCase();
            const author = (book.author || '').toLowerCase();
            const searchLower = (search || '').toLowerCase(); 

            return (title && title.includes(searchLower)) || (author && author.includes(searchLower));
        });
    }
  
    // Сортировка
    filteredItems.sort((a, b) => {
      switch (sortType) {
        case 'по цене':
          return sortDirection === 'asc' ? a.price - b.price : b.price - a.price;
        case 'по новизне':
          return sortDirection === 'asc' ? a.id - b.id : b.id - a.id;
        case 'по алфавиту':
          return sortDirection === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    if (condition) {
        filteredItems = filteredItems.filter((book) => book.condition === condition);
    }

    if (condition === 'Подарки') {
      filteredItems = filteredItems.filter((book) => book.condition === 'Подарки');
    }
  
    setItems(filteredItems);
  }, [originalItems, setItems, sortType, sortDirection, condition]);

  const handleResetFilters = () => { // Сбросить состояние фильтров
    setGiftsCategory([]);
    setMinPrice('');
    setMaxPrice('');
    setIsFiltersOpen(false);
  };

  const loadMoreBooks = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 24);
  };

  useEffect(() => {
    if (data !== undefined && minPrice !== undefined && maxPrice !== undefined) {
        filtersAndSortings(giftsCategory, minPrice, maxPrice, searchPlace);
    }
  }, 
[giftsCategory, sortType, sortDirection, minPrice, maxPrice, searchPlace, data, condition, filtersAndSortings]);

  useEffect(() => {
    if (data !== undefined && minPrice !== undefined && maxPrice !== undefined) {
        filtersAndSortings(giftsCategory, minPrice, maxPrice, searchPlace);
    }
  }, [giftsCategory, sortType, sortDirection, minPrice, maxPrice, searchPlace, data, condition, filtersAndSortings]);


  const handleGenreChange = useCallback((selectedGenre) => {
    setGiftsCategory((prevGenres) => {
        const updatedGenres = prevGenres.includes(selectedGenre)
              ? prevGenres.filter((genre) => genre !== selectedGenre)
              : [...prevGenres, selectedGenre];
        
        filtersAndSortings(updatedGenres, minPrice, maxPrice, searchPlace);
        return updatedGenres;
      });
  }, [minPrice, maxPrice, searchPlace, filtersAndSortings]);

  const handleMinPriceChange = useCallback((value) => {
      setMinPrice(value);
      filtersAndSortings(giftsCategory, value, maxPrice, searchPlace);
  }, [giftsCategory, maxPrice, searchPlace, filtersAndSortings]);

  const handleMaxPriceChange = useCallback((value) => {
      setMaxPrice(value);
      filtersAndSortings(giftsCategory, minPrice, value, searchPlace);
  }, [giftsCategory, minPrice, searchPlace, filtersAndSortings]);

  const handleSearchChange = useCallback((value) => {
      setSearchPlace(value);
      filtersAndSortings(giftsCategory, minPrice, maxPrice, value);
      }, [giftsCategory, minPrice, maxPrice, filtersAndSortings]);

  const toggleFilter = () => { // Закрыть список сортировки
      setIsFilterOpen(!isFilterOpen);
      setIsSortOpen(false); 
  };

  const toggleSort = () => { // Закрыть список фильтров
      setIsSortOpen(!isSortOpen);
      setIsFilterOpen(false); 
  };

  const handleSortChange = useCallback((selectedSort, newSortDirection) => {
      setSortType(selectedSort);
      setSortDirection(newSortDirection);
      filtersAndSortings(giftsCategory, minPrice, maxPrice, selectedSort, newSortDirection, searchPlace);
  }, [giftsCategory, minPrice, maxPrice, searchPlace, filtersAndSortings]);

  return {
    originalItems,
    items,
    visibleItems,
    giftsCategory,
    isFilterOpen,
    isSortOpen,
    sortType,
    sortDirection,
    minPrice,
    maxPrice,
    searchPlace,
    handleGenreChange,
    handleMinPriceChange,
    handleMaxPriceChange,
    handleSearchChange,
    toggleFilter,
    toggleSort,
    handleSortChange,
    filtersAndSortings,
    handleResetFilters,
    loadMoreBooks,
  };
};

export default useGiftsFilters;