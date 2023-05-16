import { useState, useEffect } from "react";
import axios from "axios";

export function useFetchImageData(url) {
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(url, {
          params: { page: 1 },
        });
        const slicedData = data.results.slice(0, 8);
        setImage(slicedData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { image, loading };
}

export function useFetchRankingIds() {
  const [rank, setRankID] = useState([]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const { data } = await axios.get(
          "https://kitsu.io/api/edge/anime?sort=popularityRank"
        );
        const popularAnime = data?.data;
        const animeIds = popularAnime.map((anime) => anime.id);
        setRankID(animeIds);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRanking();
  }, []);

  return rank;
}

export function useFetchTopAnime(rank) {
  const [topAnime, setTopAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTop = async () => {
      try {
        const fetchPromises = rank
          .slice(0, 7)
          .map((id) => axios.get(`https://kitsu.io/api/edge/anime/${id}`));
        const responses = await Promise.all(fetchPromises);
        const animeData = responses.map((response) => response.data);
        setTopAnime(animeData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    if (rank.length > 0) {
      fetchTop();
    }
  }, [rank]);

  return { topAnime, loading };
}
