import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Episodes = ({ slug, title }) => {
  const transformedTitle = title
    ? title.replace(/\s+/g, "-").toLowerCase()
    : "";
  const [episode, setEpisode] = useState([]);
  useEffect(() => {
    const fetchEpisodes = async () => {
      let response;
      try {
        response = await axios.get(
          `https://c.delusionz.xyz/anime/gogoanime/info/${slug}`
        );
        setEpisode(response.data.episodes);
      } catch (error) {
        console.log("Error with slug:", error);
        try {
          response = await axios.get(
            `https://c.delusionz.xyz/anime/gogoanime/info/${transformedTitle}`
          );
          setEpisode(response.data.episodes);
        } catch (error) {
          console.log("Error with transformed title:", error);
        }
      }
    };

    fetchEpisodes();
  }, []);
  console.log(episode);
  return (
    <div className="mt-[20rem] m-4 lg:m-0  ">
      <span className="font-bold ml-2 lg:text-lg">Episodes</span>
      <hr className="mt-2" />
      <div className="flex flex-wrap gap-2 mt-4 ml-2 justify-center lg:justify-start">
        {episode.map((ep) => (
          <Link to={`/watch/${ep.id}`} state={{ requestEpisode: episode }}>
            <span
              key={episode.number}
              className="mr-2 border w-10 h-10 mb-2 flex items-center justify-center rounded-sm hover:bg-purple-600 cursor-pointer"
            >
              {ep.number}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Episodes;
