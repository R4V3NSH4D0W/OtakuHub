import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Watch = () => {
  const location = useLocation();
  const slug = location.state?.requestSlug;
  const title = location.state?.requestTitle;
  const transformedTitle = title
    ? title.replace(/\s+/g, "-").toLowerCase()
    : "";

  const [selectedServer, setSelectedServer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [anime, setAnime] = useState([]);

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        const { data } = await axios.get(
          `https://api.consumet.org/anime/zoro/watch/${
            slug || transformedTitle
          }`
        );
        setAnime(data);
        setSelectedServer(data.sources[0].url);
        setIsLoading(false);
        setIsVideoReady(true);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchAnimeData();
  }, [slug, transformedTitle]);

  const handleServerSelection = (serverUrl) => {
    setSelectedServer(serverUrl);
  };

  console.log(anime);

  if (isLoading || !isVideoReady) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="video-container">
        <iframe
          title="Anime Video"
          src={selectedServer}
          frameBorder="0"
          allowFullScreen
          autoPlay
        ></iframe>
      </div>
      <div className="server-buttons">
        {anime.sources &&
          anime.sources.map((source) => (
            <button
              key={source.quality}
              onClick={() => handleServerSelection(source.url)}
              className={selectedServer === source.url ? "active" : ""}
            >
              {source.quality}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Watch;
