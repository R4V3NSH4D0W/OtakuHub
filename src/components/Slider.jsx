import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useFetchImage } from "../hooks/SliderHooks";
import { useRef } from "react";
import { Link } from "react-router-dom";
const Slider = () => {
  const { image, loading: imageLoading } = useFetchImage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const touchStartX = useRef(null);
  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === image.length - 1 ? 0 : prevSlide + 1
    );
  };
  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    const touchEndX = event.changedTouches[0].clientX;
    const touchThreshold = 50;

    if (touchStartX.current - touchEndX > touchThreshold) {
      nextSlide();
    } else if (touchEndX - touchStartX.current > touchThreshold) {
      prevSlide();
    }
  };
  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? image.length - 1 : prevSlide - 1
    );
  };
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <div className="relative w-full ">
      <div
        className="relative h-[16rem]   overflow-hidden md:h-96"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {image.map((item, index) => (
          <Link
            to={`/info/${item?.id}`}
            key={item?.id}
            state={{ request: item.attributes }}
          >
            <div
              key={item.id}
              className={`duration-700 ease-in-out ${
                currentSlide === index ? "block" : "hidden"
              }`}
            >
              <img
                src={item?.attributes?.coverImage?.original}
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2  left-1/2 blur-sm lg:blur-lg opacity-50 h-full object-cover "
                alt="..."
              />
              <div
                className=" text-white relative  flex justify-between m-4 lg:m-7 lg:mr-40 lg:ml-40"
                key={item.id}
              >
                <div className="flex flex-col" key={item.id}>
                  <span className=" text-sm font-black lg:text-3xl ">
                    {truncateString(item?.attributes?.titles?.en_jp, 35)}
                  </span>
                  <div className=" text-sm w-[15rem] lg:w-full lg:text-base">
                    {/* {item.genres.join(", ")} */}
                  </div>
                  <span className=" font-bold text-sm lg:text-xl">summary</span>
                  <p className=" text-[0.8rem] w-[15rem] lg:hidden ">
                    {truncateString(item?.attributes?.description, 100)}
                  </p>
                  <p className=" text-sm w-[45rem] hidden  lg:block ">
                    {truncateString(item?.attributes?.description, 600)}
                  </p>
                  <p className=" text-[0.8rem] lg:text-sm font-bold">
                    Status: {item?.attributes?.status}
                  </p>
                  <p className=" text-[0.8rem] lg:text-sm font-bold">
                    Release Date: {item?.attributes?.startDate}
                  </p>
                  {/* <span className=" bg-gray-500 w-[40%] lg:w-[14%] items-center px-2 py-1 mt-2 cursor-pointer rounded hover:bg-gray-400 text-sm lg:text-md font-bold">
                  Watch Now
                </span> */}
                </div>
                <div className="mr-4">
                  <img
                    className=" h-[10rem] md:h-[15rem] md:w-[12rem] lg:h-[20rem] lg:w-[14rem] object-cover"
                    src={item?.attributes?.posterImage?.large}
                    alt={item?.id}
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Slider controls */}
      <div className=" hidden lg:block">
        <button
          type="button"
          className="absolute top-0 left-0 z-0 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={prevSlide}
        >
          <span
            className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-200/30
         group-hover:bg-white/50 dark:group-hover:bg-gray-300/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-400/70
          group-focus:outline-none "
          >
            <FiChevronLeft className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" />
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="absolute top-0 right-0 z-0 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none "
          onClick={nextSlide}
        >
          <span
            className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10
         bg-white/30 dark:bg-gray-200/30 group-hover:bg-white/50 dark:group-hover:bg-gray-300/60 group-focus:ring-4 group-focus:ring-white
          dark:group-focus:ring-gray-400/70 group-focus:outline-none"
          >
            <FiChevronRight className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" />
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
      {/* Slider indicators */}
      <div className="absolute z-0 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
        {image.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-white" : "bg-gray-300"
            }`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Slider;
