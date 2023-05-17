import axios from "axios";
import { useState, useEffect } from "react";

export function infoModelData({ id }) {
  const [anime, setAnime] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://kitsu.io/api/edge/anime/${id}`;
      try {
        setIsLoading(true); // Set loading state to true before making the API request
        const { data } = await axios.get(url);
        setAnime(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); // Set loading state to false after the API request is completed
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const storedWatchList = JSON.parse(localStorage.getItem("watchList")) || [];
    setWatchList(storedWatchList);
  }, []);

  const handleWatchList = (animeId) => {
    const isAlreadyAdded = watchList.includes(animeId);
    if (isAlreadyAdded) {
      const updatedWatchList = watchList.filter((id) => id !== animeId);
      setWatchList(updatedWatchList);
      localStorage.setItem("watchList", JSON.stringify(updatedWatchList));
    } else {
      const updatedWatchList = [...watchList, animeId];
      setWatchList(updatedWatchList);
      localStorage.setItem("watchList", JSON.stringify(updatedWatchList));
    }

    console.log("Is already added to watch list:", isAlreadyAdded);
  };

  console.log(watchList);

  return { anime, isLoading, watchList, handleWatchList };
}
