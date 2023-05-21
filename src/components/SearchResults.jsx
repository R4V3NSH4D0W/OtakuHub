import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import nothing from "../assets/nothing.gif";
import mad from "../assets/mad.gif";
import notsure from "../assets/notsure.gif";
const SearchResults = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const searchQuery = new URLSearchParams(location.search).get("q");
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const encodedSearch = encodeURIComponent(searchQuery);
        const response = await axios.get(
          `https://kitsu.io/api/edge/anime?filter[text]=${encodedSearch}&page[limit]=8`
        );
        setSearchResults(response.data.data);
        setLoading(false);
        inputRef.current.blur(); // Close the keyboard
      } catch (error) {
        console.error("Error fetching search results:", error);
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchResult();
    } else {
      setLoading(false);
    }
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

  if (!searchQuery) {
    return (
      <div className=" flex flex-col justify-center items-center h-[80vh]">
        <img src={mad} alt="loading" />
        <span className=" text-3xl font-black"> Your Search Is Empty </span>
      </div>
    );
  }

  if (searchResults.length === 0) {
    return (
      <div className=" flex flex-col justify-center items-center h-[80vh]">
        <img src={notsure} alt="loading" />
        <span className=" text-2xl font-black">
          No results found for "{searchQuery}".
        </span>
      </div>
    );
  }

  return (
    <div className="lg:flex lg:flex-row lg:gap-4">
      <div className="lg:w-full">
        <div className="mt-2">
          <div className="flex flex-wrap lg:p-4">
            {searchResults.map((lists) => (
              <div
                className="relative w-1/2 p-2 lg:w-1/4 cursor-pointer lg:hover:scale-105"
                key={lists?.id}
              >
                <Link
                  to={`/info/${lists?.id}`}
                  state={{ request: lists?.attributes }}
                >
                  <img
                    src={lists?.attributes?.posterImage?.original}
                    className="w-full h-[15rem] object-cover lg:h-[20rem]"
                    alt={lists?.attributes?.titles?.en_jp}
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
  );
};

export default SearchResults;
