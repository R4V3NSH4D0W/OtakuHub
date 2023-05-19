import React, { useState, useEffect, useMemo } from "react";
import nothing from "../assets/nothing.gif";
import { TopRank } from "./TopRank";
import { Link } from "react-router-dom";
import axios from "axios";

const Card = ({ name }) => {
  const [anime, setAnime] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const data = await axios.get(
          `https://kitsu.io/api/edge/anime?sort=-updatedAt&page[limit]=8`
        );
        setAnime(data?.data?.data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
      }
    };
    fetchAnime();
  }, []);
  console.log(anime);
  const truncateString = useMemo(
    () => (str, num) => {
      if (str?.length > num) {
        return str.slice(0, num) + "...";
      } else {
        return str;
      }
    },
    []
  );

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <img src={nothing} alt="loading" />
      </div>
    );
  }

  return (
    <>
      <div className=" lg:flex  lg:flex-row lg:gap-4">
        <div className="lg:w-[70%]">
          <h1 className=" m-2 text-white font-black text-md">{name}</h1>
          <hr />
          <div className="mt-2  lg:bg-zinc-800">
            <div className="flex flex-wrap lg:p-4">
              {anime.map((lists) => (
                <div
                  className=" relative w-1/2 p-2 lg:w-1/4 cursor-pointer lg:hover:scale-105 "
                  key={lists?.id}
                >
                  <Link
                    to={`/info/${lists?.id}`}
                    state={{ request: lists?.attributes }}
                  >
                    <img
                      src={lists?.attributes?.posterImage?.original}
                      className="w-full h-[15rem] object-cover lg:h-[20rem] "
                    />
                  </Link>
                  <p className="absolute bottom-4 pl-2 text-white font-bold overflow-x-hidden">
                    {truncateString(lists?.attributes?.titles?.en_jp, 20)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <TopRank />
      </div>
    </>
  );
};

export default React.memo(Card);
