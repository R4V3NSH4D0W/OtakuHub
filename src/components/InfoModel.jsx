import { Link } from "react-router-dom";
import { BsBookmark } from "react-icons/bs";
import nothing from "../assets/nothing.gif";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Episodes from "./Episodes";
const InfoModel = () => {
  const { id } = useParams();
  const [imageError, setImageError] = useState(false);
  const location = useLocation();
  const [genres, setGenres] = useState([]);
  const anime = location.state.request;

  const slug = anime?.slug;
  const title = anime?.titles?.en_jp;
  //fetch self Genre ID
  useEffect(() => {
    const fetchRelatedGenres = async () => {
      try {
        const response = await axios.get(
          `https://kitsu.io/api/edge/anime/${id}/relationships/genres`
        );
        const genreIds = response.data.data.map((genre) => genre.id);
        const genreNames = await Promise.all(genreIds.map(fetchGenreName));
        setGenres(genreNames);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRelatedGenres();
  }, [id]);
  //fetch genres Name Through ID
  const fetchGenreName = async (genreId) => {
    try {
      const response = await axios.get(
        `https://kitsu.io/api/edge/genres/${genreId}`
      );
      return response.data.data.attributes.name;
    } catch (error) {
      console.log(error);
    }
  };
  const handleImageError = () => {
    setImageError(true);
  };
  const originalImage = anime?.coverImage?.original;

  return (
    <>
      <div className="flex text-white flex-col lg:flex-row">
        <div className="flex w-full">
          <div className="relative w-full h-[35rem] lg:h-[30rem]">
            {/* <!-- Image --> */}
            {originalImage && !imageError ? (
              <img
                src={originalImage}
                alt="cover"
                className="w-full h-full object-cover blur brightness-50"
                onError={handleImageError}
              />
            ) : (
              <img
                src="https://w.wallhaven.cc/full/we/wallhaven-welokx.png"
                alt="Alternative Image"
                className="w-full h-full object-cover blur brightness-50"
              />
            )}
            {/* <!-- Poster Image --> */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 lg:left-0 lg:top-0 p-4 h-[16rem] w-[12rem] lg:h-[18rem] lg:w-[14rem] object-cover lg:translate-x-0">
              <img
                src={anime?.posterImage?.large}
                className="h-full w-full object-cover"
              />
            </div>
            {/* <!-- Information Block --> */}
            <div className="absolute top-2 pt-[12rem] pl-4 lg:top-4 lg:pl-[12rem] lg:pt-0 flex flex-col lg:flex-row">
              {/* <!-- Left Section (Title, Buttons, Description) --> */}
              <div className="flex flex-col items-center lg:items-start pt-6 lg:pl-8 lg:pt-0 lg:w-[70%]">
                <span className="font-bold text-2xl pt-4">
                  {anime?.titles?.en_jp}
                </span>
                <div className="flex gap-2 mt-2 font-bold">
                  {/* <!-- Watch Now Button --> */}
                  <Link
                    to={`/watch/`}
                    state={{
                      requestSlug: slug,
                      requestTitle: title,
                      episodeIndex: 1,
                    }}
                  >
                    <button className="bg-purple-600 w-[6rem] rounded-lg h-10 hover:bg-purple-500 items-center">
                      Watch Now
                    </button>
                  </Link>
                  {/* <!-- Bookmark Button --> */}
                  <button className="flex items-center justify-center bg-purple-600 w-[7rem] rounded-lg h-10 hover:bg-purple-500">
                    <BsBookmark className="" /> Bookmark
                  </button>
                </div>
                {/* <!-- Anime Description --> */}
                <div className="mt-4 h-60 overflow-y-scroll scrollbar-hide lg:h-full">
                  <span className="flex text-justify pr-5 w-full lg:w-[80%]">
                    {anime?.description}
                  </span>
                </div>
              </div>
              {/* <Right Section (Additional Information) */}
              <div className="lg:w-[30%] lg:p-[2rem] mt-5">
                <div className="flex flex-col gap-2 font-bold lg:text-md">
                  <span>Japanese: {anime?.titles?.ja_jp}</span>
                  <span>Status: {anime?.status}</span>
                  <span>Released Date: {anime?.startDate}</span>
                  <span>Total Episodes: {anime?.episodeCount}</span>
                  <span>Episode Length: {anime?.episodeLength} min</span>
                  <span>Total Length: {anime?.totalLength} min</span>
                  <div className="flex flex-wrap w-full gap-2">
                    {genres.map((list) => (
                      <span
                        className="border rounded-lg p-2 hover:text-gray-400 cursor-pointer"
                        key={list}
                      >
                        {list}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Episodes slug={slug} title={title} />
    </>
  );
};

export default InfoModel;
