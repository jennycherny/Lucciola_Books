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
                const { data: booksData, error: booksError } = await supabase
                    .from('BooksData')
                    .select('*');
                
                const { data: giftsData, error: giftsError } = await supabase
                    .from('GiftsData')
                    .select('*');
                console.log(giftsData);

                const { data: promoData, error: promoError } = await supabase
                    .from('Promo')
                    .select('id, promo');

                const { data: imagesData, error: imagesError } = await supabase
                    .from('ImagesData')
                    .select('id, img2, img3, img4');

                const { data: languageData, error: languageError } = await supabase
                    .from('Language')
                    .select('id, language');
                
                const { data: rentedData, error: rentedError } = await supabase
                    .from('Rented')
                    .select('id, rented');
                
                if (booksError || giftsError || promoError || imagesError || languageError || rentedError) {
                    setError(booksError || giftsError || promoError || imagesError || languageError || rentedError);
                } else {
                    const processedBooksData = booksData.map(book => {
                        const promo = promoData.find(promo => promo.id === book.id);
                        const images = imagesData.find(image => image.id === book.id);
                        const language = languageData.find(language => language.id === book.id);
                        const rented = rentedData.find(rented => rented.id === book.id);

                        return {
                            ...book,
                            promo: promo ? promo.promo : null,
                            images: images ? images : null,
                            language: language ? language.language : null,
                            rented: rented ? rented.rented : null,
                        };
                    });


                    const processedGiftsData = giftsData.map(gift => {
                        return gift;
                    });

                    const combinedData = [...processedBooksData, ...processedGiftsData];
                    
                    setData(combinedData);
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