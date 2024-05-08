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

        const { data: imagesData, error: imagesError } = await supabase
          .from("ImagesData")
          .select("id, img2, img3, img4");

        if (
          booksError ||
          giftsError ||
          imagesError 
        ) {
          setError(
            booksError ||
              giftsError ||
              imagesError 
          );
        } else {
          const processedBooksData = booksData.map((book) => {
            const images = imagesData.find((image) => image.id === book.id);

            return {
              ...book,
              images: images ? images : null,
            };
          });

          const processedGiftsData = giftsData.map((gift) => {
            const images = imagesData.find((image) => image.id === gift.id);

            return {
              ...gift,
              images: images ? images : null,
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
