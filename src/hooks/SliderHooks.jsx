import { useState, useEffect } from "react";
import axios from "axios";

export function useFetchImage() {
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = "https://kitsu.io/api/edge/trending/anime";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(url);
        setImage(data.data);
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
