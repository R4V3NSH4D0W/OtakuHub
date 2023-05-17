import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Row = ({ title, URL, rowID }) => {
  const [anime, setAnime] = useState([]);
  useEffect(() => {
    axios.get(URL).then((response) => {
      setAnime(response.data.results);
    });
  }, [URL]);

  const slideLeft = () => {
    var slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  return (
    <>
      <div className="mb-2 mt-2 text-white font-bold">
        <span className="m-2">{title}</span>
        <hr className="mt-2" />
        <div className="lg:bg-zinc-800 mt-2">
          <div className="relative flex items-center group p-2 ">
            <MdChevronLeft
              onClick={slideLeft}
              className="bg-black left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
              size={40}
            />
            <div
              id={"slider" + rowID}
              className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
            >
              {anime.map((item, id) => (
                <div
                  className="w-[180px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
                  key={item?.id}
                >
                  <img
                    className=" w-full h-[15rem] xl:h-[20rem]  block object-cover"
                    src={`${item?.image}`}
                    alt={item?.title}
                  />
                  <p className="  absolute bottom-4 left-4 w-[9rem] lg:w-[15rem]  text-white font-bold overflow-x-hidden">
                    {item?.title}
                  </p>
                  <div className=" absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                    <Link to={`/info/${item?.id}`}>
                      <p className=" whitespace-normal text-xl md:text-sm font-bold flex justify-center items-center h-full text-center">
                        {item?.title}
                      </p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <MdChevronRight
              onClick={slideRight}
              className="bg-black right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
              size={40}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Row;
