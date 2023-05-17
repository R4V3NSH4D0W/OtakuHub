import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import logo from "../assets/logo.png";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const Lists = [{ name: "Home" }, { name: "Top Anime" }, { name: "Movies" }];

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  };

  return (
    <>
      <nav className="bg-purple-600 h-[4rem] w-full flex items-center p-2 lg:p-8 lg:bg-black">
        <div className=" lg:hidden">
          <button
            className="text-white text-3xl font-black flex items-center"
            onClick={toggleMenu}
          >
            <AiOutlineMenu className="mr-2" />
          </button>
          {isMenuOpen && (
            <div className="absolute left-0 w-full h-full mt-4 bg-gray-600 opacity-80 text-white z-10  ">
              {Lists.map((list) => (
                <div className="px-4 py-2  hover:bg-gray-500" key={list.name}>
                  <span className="pl-2 hover:text-white">{list.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-1 ">
          <img
            src={logo}
            className="rounded-full h-9 bg-black lg:bg-gray-700 overflow-hidden"
            alt="logo"
          />
          <span className=" text-white ml-3 font-black text-2xl hidden lg:block">
            Otaku Hub
          </span>
        </div>
        <div className="flex flex-1 lg:flex-none pl-5 relative">
          <input
            type="text"
            placeholder="Search..."
            className="h-8 pl-2 pr-8 w-[13rem] lg:w-[15rem] rounded focus:outline-none"
          />
          <FaSearch className="absolute right-2 md:right-14 lg:right-3 top-1/2 transform -translate-y-1/2 text-black" />
        </div>

        <div className="flex flex-1 lg:flex-none text-white pl-4">
          <BsFillMoonStarsFill className=" hover:text-gray-200 cursor-pointer" />
        </div>
      </nav>
      <div className=" bg-purple-600 h-10 pt-1 items-center hidden lg:block">
        <div className="pl-[2rem] flex gap-4 text-white text-md font-bold">
          {Lists.map((lists) => (
            <span key={lists.name}>{lists.name}</span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
