import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Lists = () => {
  const location = useLocation();
  const getData = location?.state?.requestData;
  const [anime, setAnime] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${getData}&page[limit]=8`;
        const response = await axios.get(url);
        setAnime(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getData]);
  console.log(anime);
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <>
      <div className=" lg:flex  lg:flex-row lg:gap-4">
        <div className="lg:w-full">
          <div className="mt-2 ">
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
      </div>
    </>
  );
};

export default Lists;
