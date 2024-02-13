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

                const { data: promoData, error: promoError } = await supabase
                    .from('Promo')
                    .select('id, promo');

                const { data: imagesData, error: imagesError } = await supabase
                    .from('ImagesData')
                    .select('id, img2, img3, img4');

                const { data: languageData, error: languageError } = await supabase
                    .from('Language')
                    .select('id, language');
                
                if (booksError || promoError || imagesError || languageError) {
                    setError(booksError || promoError || imagesError || languageError);
                } else {
                    const processedData = booksData.map(book => {
                        const promo = promoData.find(promo => promo.id === book.id);
                        const images = imagesData.find(image => image.id === book.id);
                        const language = languageData.find(language => language.id === book.id);

                        return {
                            ...book,
                            promo: promo ? promo.promo : null,
                            images: images ? images : null,
                            language: language ? language.language : null,
                        };
                    });
                    setData(processedData);
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