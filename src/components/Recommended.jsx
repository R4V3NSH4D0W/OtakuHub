import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
const Recommended = ({ animeId }) => {
  const [result, setResult] = useState([]);
  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const response = await axios.get(
          `https://kitsu.io/api/edge/anime/${animeId}/suggestions`
        );
        setResult(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecommended();
  }, [animeId]);
  console.log(result);

  return <div>Recommended</div>;
};

export default Recommended;
