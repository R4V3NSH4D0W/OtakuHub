import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

const Watch = () => {
  const location = useLocation();
  const { slug } = useParams();
  const title = location.state?.requestTitle;
  const transformedTitle = title
    ? title.replace(/\s+/g, "-").toLowerCase()
    : "";

  console.log(transformedTitle);

  // Use the values in your component
  const [anime, setAnime] = useState([]);

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        const { data } = await axios.get(
          `https://api.consumet.org/anime/gogoanime/info/${
            slug || transformedTitle
          }`
        );
        setAnime(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAnimeData();
  }, [slug, transformedTitle]);

  console.log(anime);

  return <div>Watch</div>;
};

export default Watch;
