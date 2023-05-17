import React from "react";
import { Link } from "react-router-dom";
export const TopRank = ({ topAnime }) => {
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <>
      <div className=" text-white lg:w-[40%]">
        <h1 className=" m-2 text-white font-black text-md">Top Rank</h1>
        <hr />
        <div className=" flex flex-col bg-zinc-800  mt-2">
          {topAnime.map((top) => (
            <Link to={`/info/${top?.data?.id}`} key={top?.data?.id}>
              <div
                className=" flex flex-row gap-4 m-2 mt-[0.8rem] mr-4 "
                key={top?.data?.id}
              >
                <div className="w-[2.5rem] h-8 border border-white  flex items-center justify-center mt-[1.5rem] ml-2 cursor-pointer hover:lg:bg-zinc-600">
                  <span className="text-white text-sm font-black">
                    {top?.data?.attributes?.popularityRank}
                  </span>
                </div>
                <div className="relative w-full lg:bg-zinc-600 hover:lg:bg-zinc-500 cursor-pointer">
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
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
