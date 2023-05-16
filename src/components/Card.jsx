import React from "react";
import {
  useFetchImageData,
  useFetchRankingIds,
  useFetchTopAnime,
} from "../hooks/CustomHooks";
import { useFetchImage } from "../hooks/SliderHooks";
import nothing from "../assets/nothing.gif";
const Card = ({ name, URL }) => {
  const { image, loading: imageLoading } = useFetchImageData(URL);
  const rank = useFetchRankingIds();
  const { topAnime, loading: topAnimeLoading } = useFetchTopAnime(rank);

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
            <div className="flex flex-wrap lg:p-4 ">
              {image.map((lists) => (
                <div
                  className=" relative w-1/2 p-2 lg:w-1/4 cursor-pointer"
                  key={lists?.id}
                >
                  <img
                    src={lists?.image}
                    className="w-full h-[15rem] object-cover lg:h-[20rem] "
                  />
                  <p className="absolute bottom-4 pl-2 text-white font-bold overflow-x-hidden">
                    {truncateString(lists?.title, 20)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className=" text-white lg:w-[40%]">
          <h1 className=" m-2 text-white font-black text-md">Ranking</h1>
          <hr />
          <div className=" flex flex-col bg-zinc-800 mt-2">
            {topAnime.map((top) => (
              <div
                className=" flex flex-row gap-4 m-2 mt-[0.8rem] mr-4 "
                key={top?.data?.id}
              >
                <div className="w-[2.5rem] h-8 border border-white  flex items-center justify-center mt-[1.5rem] ml-2 cursor-pointer">
                  <span className="text-white text-sm">
                    {top?.data?.attributes?.popularityRank}
                  </span>
                </div>
                <div className="relative w-full lg:bg-zinc-600 cursor-pointer">
                  <img
                    src={top?.data?.attributes?.posterImage?.tiny}
                    className=" h-[5rem] w-[5rem] object-cover "
                  />
                  <div className=" absolute top-7 font-bold left-[7rem]  lg:hidden">
                    {truncateString(top?.data?.attributes?.titles?.en_jp, 25)}
                  </div>
                  <div className=" absolute top-7 font-black left-[7rem] hidden lg:block">
                    {top?.data?.attributes?.titles?.en_jp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
