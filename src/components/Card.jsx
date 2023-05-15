import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const Card = ({ name, URL }) => {
  const [image, setImage] = useState([]);
  const [rank, setRankID] = useState([]);
  const [topanime, setTopAnime] = useState([]);
  const [rankingInfo, setRankingInfo] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(URL, {
          params: { page: 1 },
        });
        const slicedData = data.results.slice(0, 8);
        setImage(slicedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [URL]);
  //   console.log(image);
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };
  //this will fetch anime ranking ids
  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const { data } = await axios.get(
          "https://kitsu.io/api/edge/anime?sort=popularityRank"
        );
        const popularAnime = data?.data;
        const animeIds = popularAnime.map((anime) => anime.id);
        setRankID(animeIds);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRanking();
  }, []);
  console.log(rank);
  //This Will Fetch anime Ranking Ids detail
  useEffect(() => {
    const fetchTop = async () => {
      try {
        const fetchPromises = rank
          .slice(0, 7)
          .map((id) => axios.get(`https://kitsu.io/api/edge/anime/${id}`));
        const responses = await Promise.all(fetchPromises);
        const animeData = responses.map((response) => response.data);
        setTopAnime(animeData);
      } catch (error) {
        console.log(error);
      }
    };

    if (rank.length > 0) {
      fetchTop();
    }
  }, [rank]);
  console.log(topanime);
  useEffect(() => {
    const fetchOtherAPI = async () => {
      try {
        const fetchPromises = topanime.map((top) => {
          const title = top?.data?.attributes?.titles?.en_jp?.replace(
            /\s+/g,
            "-"
          );
          const slug = top?.data?.attributes?.slug;
          let requestUrl;

          // Use title if available and not equal to slug, otherwise use slug
          if (title && title !== slug) {
            requestUrl = `https://api.consumet.org/anime/gogoanime/info/${title}`;
          } else {
            requestUrl = `https://api.consumet.org/anime/gogoanime/info/${slug}`;
          }

          return axios.get(requestUrl);
        });

        const responses = await Promise.all(fetchPromises);
        const updatedTopAnime = responses.map((response, index) => {
          const data = response.data;
          const genres = data?.genres;
          return {
            ...topanime[index],
            genres,
          };
        });

        setTopAnime(updatedTopAnime);
      } catch (error) {
        console.log(error);
      }
    };

    if (topanime.length > 0) {
      fetchOtherAPI();
    }
  }, [topanime]);

  console.log(topanime);
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
            {topanime.map((top) => (
              <div
                className=" flex flex-row gap-4 m-2 mt-[0.8rem] mr-4 "
                key={top?.data?.id}
              >
                <div className="w-8 h-8 border border-white  flex items-center justify-center mt-5 ml-2 cursor-pointer">
                  <span className="text-white text-sm">
                    {top?.data?.attributes?.popularityRank}
                  </span>
                </div>
                <div className="relative w-full lg:bg-zinc-600 cursor-pointer">
                  <img
                    src={top?.data?.attributes?.posterImage?.tiny}
                    className=" h-[5rem] w-[5rem] object-cover "
                  />
                  <div className=" absolute top-2 left-[6rem] h- lg:hidden">
                    {truncateString(top?.data?.attributes?.slug, 25)}
                  </div>
                  <div className=" absolute top-2 left-[6rem] hidden lg:block">
                    {top?.data?.attributes?.slug}
                  </div>
                  <div className=" absolute top-6 left-[6rem] hidden lg:block">
                    {top?.genres &&
                      top?.genres.map((genre) => (
                        <span
                          className="px-2 py-1 text-xs bg-gray-600 text-white rounded-md mr-2"
                          key={genre.id}
                        >
                          {genre.name}
                        </span>
                      ))}
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
