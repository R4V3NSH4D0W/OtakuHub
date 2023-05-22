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
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        let requestUrl = "";
        if (slug) {
          requestUrl = `https://c.delusionz.xyz/anime/gogoanime/servers/${slug}-episode-1`;
        } else if (transformedTitle) {
          requestUrl = `https://c.delusionz.xyz/anime/gogoanime/servers/${transformedTitle}-episode-1`;
        }

        const { data } = await axios.get(requestUrl);
        // console.log("API Response:", data);
        setAnime(data);

        if (data.length > 0) {
          setSelectedServer(data[0].url);
          setIsVideoReady(true);
        } else {
          setIsVideoReady(false);
        }

        setIsLoading(false);
      } catch (error) {
        // console.log(error);
        setIsLoading(false);
        setError(error);
        if (!slug && transformedTitle && error?.response?.status === 404) {
          try {
            const { data } = await axios.get(
              `https://c.delusionz.xyz/anime/gogoanime/servers/${transformedTitle}-episode-1`
            );
            console.log("API Response:", data);
            setAnime(data);

            if (data.length > 0) {
              setSelectedServer(data[0].url);
              setIsVideoReady(true);
            } else {
              setIsVideoReady(false);
            }

            setIsLoading(false);
          } catch (error) {
            console.log(error);
            setIsLoading(false);
            setError(error);
          }
        } else if (
          slug &&
          transformedTitle &&
          error?.response?.status === 404
        ) {
          try {
            const { data } = await axios.get(
              `https://c.delusionz.xyz/anime/gogoanime/servers/${transformedTitle}-episode-1`
            );
            // console.log("API Response:", data);
            setAnime(data);

            if (data.length > 0) {
              setSelectedServer(data[0].url);
              setIsVideoReady(true);
            } else {
              setIsVideoReady(false);
            }

            setIsLoading(false);
          } catch (error) {
            console.log(error);
            setIsLoading(false);
            setError(error);
          }
        }
      }
    };

    fetchAnimeData();
  }, [slug, transformedTitle]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  // console.log("Anime data:", anime);

  if (isLoading || !isVideoReady) {
    return <div>Loading...</div>;
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
        <div className="mt-4 m-2 flex flex-wrap-reverse">
          {anime.map((source, index) => (
            <button
              key={index}
              onClick={() => handleServerSelection(source.url)}
              className={`px-2 py-2 m-2 rounded-sm ${
                selectedServer === source.url
                  ? "bg-blue-500 text-white"
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
