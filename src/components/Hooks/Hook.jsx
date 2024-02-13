import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const Hook = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const booksData = await supabase.from('BooksData').select('*');
                const imagesData = await supabase.from('ImagesData').select('*');
                console.log('ImagesData:', imagesData);
                
                if (booksData.error || imagesData.error) {
                    setError(booksData.error || imagesData.error);
                } else {
                    const data = booksData.data.map(book => {
                        const imagesForBook = imagesData.data
                            .filter(image => image.id === book.id)
                            .map(image => ({
                                img2: image.img2,
                                img3: image.img3,
                                img4: image.img4
                            }));
                        return {
                            ...book,
                            images: imagesForBook.length > 0 ? imagesForBook[0] : null
                        };
                    });
                
                    setData(data);
                }
            } catch (error) {
                console.error('Ошибка при запросе данных:', error);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return {
        data,
        isLoading,
        error,
    };
};

export default Hook;