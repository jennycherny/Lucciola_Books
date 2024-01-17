import { useState, useEffect, useCallback } from 'react';

const useBookFilters = (data, condition) => {
    const [originalItems, setOriginalItems] = useState([]);
    const [items, setItems] = useState([]);
    const [visibleItems, setVisibleItems] = useState(20); // Количество загруженных книг
    
    const [isFiltersOpen, setIsFiltersOpen] = useState(false); ////состояние выпадающего списка фильтров
    const [selectedGenres, setSelectedGenres] = useState([]); //фильтрация по жанрам
    const [isFilterOpen, setIsFilterOpen] = useState(false); //состояние выпадающего списка фильтров


    const [isSortOpen, setIsSortOpen] = useState(false); //состояние выпадающего списка сортировки
    const [sortType, setSortType] = useState('по новизне'); // сортировка
    const [sortDirection, setSortDirection] = useState('desc'); //направления сортировки

    const [minAge, setMinAge] = useState(''); // Состояние для минимального возраста
    const [maxAge, setMaxAge] = useState(''); //Состояние для максимального возраста

    const [minPrice, setMinPrice] = useState(''); // Состояние для минимальной цены
    const [maxPrice, setMaxPrice] = useState(''); // Состояние для максимальной цены 

    const [searchPlace, setSearchPlace] = useState('');//Состояние для поисковой строки

    useEffect(() => {
        setOriginalItems(data);
        setItems(data);
      }, [data, condition]);

      useEffect(() => {
        if (data !== undefined && minPrice !== undefined && maxPrice !== undefined) {
            filtersAndSortings(selectedGenres, minPrice, maxPrice, minAge, maxAge, searchPlace);
        }
    }, [selectedGenres, sortType, sortDirection, minPrice, maxPrice, minAge, maxAge, searchPlace, data, condition]);


const handleGenreChange = useCallback((selectedGenre) => {
    setSelectedGenres((prevGenres) => {
        const updatedGenres = prevGenres.includes(selectedGenre)
            ? prevGenres.filter((genre) => genre !== selectedGenre)
            : [...prevGenres, selectedGenre];

        filtersAndSortings(updatedGenres, minPrice, maxPrice, minAge, maxAge, searchPlace);
        return updatedGenres;
    });
}, [minPrice, maxPrice, minAge, maxAge, searchPlace]);

const handleMinPriceChange = useCallback((value) => {
    setMinPrice(value);
    filtersAndSortings(selectedGenres, value, maxPrice, minAge, maxAge, searchPlace);
}, [selectedGenres, maxPrice, minAge, maxAge, searchPlace]);

const handleMaxPriceChange = useCallback((value) => {
    setMaxPrice(value);
    filtersAndSortings(selectedGenres, minPrice, value, minAge, maxAge, searchPlace);
}, [selectedGenres, minPrice, minAge, maxAge, searchPlace]);

const handleMinAgeChange = useCallback((value) => {
    setMinAge(value);
    filtersAndSortings(selectedGenres, minPrice, maxPrice, value, maxAge, searchPlace);
  }, [selectedGenres, minPrice, maxPrice, maxAge, searchPlace]);

const handleMaxAgeChange = useCallback((value) => {
    setMaxAge(value);
    filtersAndSortings(selectedGenres, minPrice, maxPrice, minAge, value, searchPlace);
    }, [selectedGenres, minPrice, maxPrice, minAge, searchPlace]);

const handleSearchChange = useCallback((value) => {
    setSearchPlace(value);
    filtersAndSortings(selectedGenres, minPrice, maxPrice, minAge, maxAge, value);
    }, [selectedGenres, minPrice, maxPrice, minAge, maxAge]);

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
    filtersAndSortings(selectedGenres, minPrice, maxPrice, selectedSort, newSortDirection, searchPlace);
}, [selectedGenres, minPrice, maxPrice, minAge, maxAge, searchPlace]);

const filtersAndSortings = useCallback((genres, min, max, minAge, maxAge, search) => {
    console.log("Genres:", genres);
    console.log("Min:", min);
    console.log("Max:", max);
    console.log("MinAge:", minAge);
    console.log("MaxAge:", maxAge);
    console.log("Search:", search);

    let filteredItems = originalItems.slice();
  
    // Фильтрация по жанру
    if (genres.length > 0) {
      filteredItems = filteredItems.filter((book) => genres.includes(book.category));
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
  
    // Фильтрация по возрасту
    if (minAge !== '' || maxAge !== '') {
      filteredItems = filteredItems.filter((book) => {
        const age = book.age;
  
        if (minAge !== '' && maxAge !== '') {
          return age >= parseInt(minAge, 10) && age <= parseInt(maxAge, 10);
        } else if (minAge !== '') {
          return age >= parseInt(minAge, 10);
        } else if (maxAge !== '') {
          return age <= parseInt(maxAge, 10);
        }
  
        return true;
      });
    }

    // Поиск
    if (search !== '') {
        filteredItems = filteredItems.filter((book) => {
            const title = (book.title || '').toLowerCase();
            const author = (book.author || '').toLowerCase();
            const searchLower = (search || '').toLowerCase(); // Добавили проверку на существование search
        
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
  
    setItems(filteredItems);
  }, [originalItems, setItems, sortType, sortDirection, condition]);

  const handleResetFilters = () => { // Сбросить состояние фильтров
    setSelectedGenres([]);
    setMinPrice('');
    setMaxPrice('');
    setMinAge('');
    setMaxAge('');
    setIsFiltersOpen(false);
  };

  const loadMoreBooks = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 20);
  };

  return {
    originalItems,
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
    filtersAndSortings,
    handleResetFilters,
    loadMoreBooks,
  };
};

export default useBookFilters;