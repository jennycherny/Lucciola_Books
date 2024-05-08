import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

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
          .from("BooksData")
          .select("*");

        const { data: giftsData, error: giftsError } = await supabase
          .from("GiftsData")
          .select("*");

        if (booksError || giftsError) {
          setError(
            booksError ||
              giftsError
          );
        } else {
          const processedBooksData = booksData.map((book) => {
            const images = {
              img2: book.img2,
              img3: book.img3,
              img4: book.img4,
            };

            return {
              ...book,
              images: images.img2 || images.img3 || images.img4 ? images : null,
            };
          });

          const processedGiftsData = giftsData.map((gift) => {
            const images = {
              img2: gift.img2,
              img3: gift.img3,
              img4: gift.img4,
            };

            return {
              ...gift,
              images: images.img2 || images.img3 || images.img4 ? images : null,
            };
          });

          const combinedData = [...processedBooksData, ...processedGiftsData];
          setData(combinedData);
        }
      } catch (error) {
        console.error("Ошибка при запросе данных:", error);
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
