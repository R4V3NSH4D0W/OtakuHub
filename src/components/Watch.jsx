import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

const Watch = () => {
  const location = useLocation();
  const slug = location.state?.requestSlug;
  const title = location.state?.requestTitle;
  const transformedTitle = title
    ? title.replace(/\s+/g, "-").toLowerCase()
    : "";
  console.log(slug);
  console.log(transformedTitle);
  const [selectedServer, setSelectedServer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
  // Use the values in your component
  const [anime, setAnime] = useState([]);

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        const { data } = await axios.get(
          `https://api.consumet.org/anime/gogoanime/servers/${
            slug || transformedTitle
          }-episode-1`
        );
        setAnime(data);
        setSelectedServer(data[0].url);
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
    setIsLoading(false);
    setSelectedServer(serverUrl);
  };

  console.log(anime);

  return (
    <div className="w-full lg:w-3/5 order-1 lg:order-2  md:order-1">
      <iframe
        src={selectedServer}
        title="Selected Server"
        className="w-full h-[31vh]  lg:h-[40vh] xl:h-[70vh] sm:h-[45vh] md:h-[40vh]"
        allowFullScreen
        scrolling="no"
      ></iframe>

      <div className="flex flex-wrap p-2 lg:justify-center md:justify-center">
        {anime.map((item, index) => (
          <button
            key={index}
            onClick={() => handleServerSelection(item.url)}
            className={`bg-gray-200 rounded px-4 py-2 m-1 mb-2 w-[6.6rem] font-bold text-sm lg:text-md flex justify-center ${
              selectedServer === item.url ? "bg-gray-400" : ""
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Watch;
