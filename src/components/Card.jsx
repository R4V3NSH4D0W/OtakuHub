import React from "react";
import {
  useFetchImageData,
  useFetchRankingIds,
  useFetchTopAnime,
} from "../hooks/CustomHooks";
import nothing from "../assets/nothing.gif";
import { TopRank } from "./TopRank";
import { Link } from "react-router-dom";
const Card = ({ name, URL }) => {
  const { image, loading: imageLoading } = useFetchImageData(URL);
  const rank = useFetchRankingIds();
  const { topAnime, loading: topAnimeLoading } = useFetchTopAnime(rank);
  const slug = anime?.data?.attributes?.slug;
  const title = anime?.data?.attributes?.titles?.en_jp;

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  if (imageLoading || topAnimeLoading) {
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
              {image.map((lists) => (
                <div
                  className=" relative w-1/2 p-2 lg:w-1/4 cursor-pointer lg:hover:scale-105 "
                  key={lists?.id}
                >
                  <Link to={`/info/${lists?.id}`}>
                    <img
                      src={lists?.image}
                      className="w-full h-[15rem] object-cover lg:h-[20rem] "
                    />
                  </Link>
                  <p className="absolute bottom-4 pl-2 text-white font-bold overflow-x-hidden">
                    {truncateString(lists?.title, 20)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <TopRank topAnime={topAnime} />
      </div>
    </>
  );
};

export default Card;
