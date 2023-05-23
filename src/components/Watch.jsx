import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import nothing from "../assets/nothing.gif";
import Error404 from "../assets/error404.gif";
const Watch = () => {
  const location = useLocation();
  const { id } = useParams();
  const episodeID = location.state?.requestEpisode;
  const [selectedServer, setSelectedServer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [anime, setAnime] = useState([]);
  const [error, setError] = useState(null);

  const handleServerSelection = (serverUrl) => {
    setSelectedServer(serverUrl);
  };
  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        const { data } = await axios.get(
          `https://c.delusionz.xyz/anime/gogoanime/servers/${id}`
        );
        setAnime(data);

        if (data.length > 0) {
          setSelectedServer(data[0].url);
          setIsVideoReady(true);
        } else {
          setIsVideoReady(false);
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchAnimeData();
  }, [id]);
  console.log(anime);
  if (isLoading || !isVideoReady) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "75vh",
        }}
      >
        <img src={nothing} alt="loading" />
      </div>
    );
  }
  if (error && slug && transformedTitle) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "75vh",
        }}
      >
        <img src={Error404} alt="error" />
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="w-full lg:w-3/4 xl:w-1/2">
          <div
            className="relative h-[32vh] lg:h-0 overflow-hidden"
            style={{ paddingBottom: "56.25%" }}
          >
            <iframe
              title="Anime Video"
              src={selectedServer}
              frameBorder="0"
              allowFullScreen
              autoPlay
              className="absolute top-0 left-0 w-full h-full"
              scrolling="no"
            ></iframe>
          </div>
        </div>
        <div className="mt-4 m-2 ml-4 flex flex-wrap">
          {anime.map((source, index) => (
            <button
              key={index}
              onClick={() => handleServerSelection(source.url)}
              className={`px-2 py-2 m-2 rounded-sm ${
                selectedServer === source.url
                  ? "bg-purple-700 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {source.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Watch;
