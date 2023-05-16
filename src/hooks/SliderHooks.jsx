import { useState, useEffect } from "react";
import axios from "axios";

export function useFetchImage() {
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = "https://api.consumet.org/anime/gogoanime/top-airing";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(url, {
          params: { page: 1 },
        });
        setImage(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { image, loading };
}

export function useFetchInfoData(image, currentSlide) {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        if (image[currentSlide]) {
          const { data } = await axios.get(
            `https://api.consumet.org/anime/gogoanime/info/${image[currentSlide].id}`
          );
          setInfo(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchInfo();
  }, [image, currentSlide]);

  return info;
}
