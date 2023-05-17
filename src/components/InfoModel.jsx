import { infoModelData } from "../hooks/InfoModel";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsBookmark } from "react-icons/bs";
import nothing from "../assets/nothing.gif";
const InfoModel = () => {
  let name = "attribute?.title?";
  const id = useParams();
  const { anime, isloading: infoloading, watchlist } = infoModelData(id);
  const slug = anime?.data?.attributes?.slug;
  const title = anime?.data?.attributes?.titles?.en_jp;
  console.log(title);
  console.log(anime);
  if (infoloading) {
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
      <div className="flex text-white flex-col lg:flex-row">
        <div className="flex w-full">
          <div className="relative w-full h-[35rem] lg:h-[30rem]">
            <img
              src={anime?.data?.attributes?.coverImage?.original}
              alt="cover"
              className="w-full h-full object-cover blur brightness-50"
            />
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 lg:left-0 lg:top-0 p-4 h-[14rem] w-[12rem] lg:translate-x-0">
              <img
                src={anime?.data?.attributes?.posterImage?.original}
                className="h-full w-full object-cover"
              />
            </div>
            <div className=" absolute top-2 pt-[12rem] pl-4 lg:top-3 lg:pl-[12rem] lg:pt-0">
              <div className=" flex flex-col">
                <div className="hidden lg:block">
                  <div className=" flex gap-2 items-center text-sm cursor-pointer ">
                    <span className="">OtakuHub</span>
                    <span>{anime?.data?.type}</span>
                  </div>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                  <span className=" font-bold text-2xl pt-4">
                    {anime?.data?.attributes?.titles?.en_jp}
                  </span>
                  <div className=" flex gap-2 mt-2 font-bold">
                    <Link
                      to={`/watch/${anime?.data?.id}`}
                      state={{ requestSlug: slug, requestTitle: title }}
                    >
                      <button className=" bg-purple-600 w-[6rem] rounded-lg h-8 hover:bg-purple-500 items-center">
                        Watch Now
                      </button>
                    </Link>
                    <button className="flex items-center justify-center bg-purple-600 w-[7rem] rounded-lg h-8 hover:bg-purple-500">
                      <BsBookmark className="" /> Bookmark
                    </button>
                  </div>
                </div>
                <div className="mt-4 h-60 overflow-y-scroll scrollbar-hide lg:h-full">
                  <span className="flex text-justify pr-5 w-full lg:w-[60%]">
                    {anime?.data?.attributes?.description}
                  </span>
                </div>
              </div>
              <div className="lg:absolute left-[70%] top-0  mt-5 lg:p-[2rem]">
                <div className="flex flex-col gap-2 font-bold lg:text-lg">
                  <span>
                    Japanese: {anime?.data?.attributes?.titles?.ja_jp}
                  </span>
                  <span>Status: {anime?.data?.attributes?.status}</span>
                  <span>
                    Released Date:{anime?.data?.attributes?.startDate}
                  </span>
                  <span>
                    Total Episodes: {anime?.data?.attributes?.episodeCount}
                  </span>
                  <span>
                    Episode Length: {anime?.data?.attributes?.episodeLength} min
                  </span>
                  <span>
                    Total Length: {anime?.data?.attributes?.totalLength} min
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoModel;
