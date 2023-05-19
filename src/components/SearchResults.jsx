import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import nothing from "../assets/nothing.gif";
const SearchResults = () => {
  const location = useLocation();
  const [searchResults, setSearchResult] = useState([]);
  const searchQuery = new URLSearchParams(location.search).get("q");
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const encodedSearch = encodeURIComponent(searchQuery);
    const fetchResult = async () => {
      try {
        const response = await axios.get(
          `https://kitsu.io/api/edge/anime?filter[text]=${encodedSearch}&page[limit]=8`
        );
        setSearchResult(response.data.data);
        setloading(false);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setloading(false);
      }
    };
    fetchResult();
  }, [searchQuery]);
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };
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
        <div className="lg:w-full">
          <div className="mt-2 ">
            <div className="flex flex-wrap lg:p-4">
              {searchResults.map((lists) => (
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

export default SearchResults;
