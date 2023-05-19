import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import InfoModel from "./components/InfoModel";
import Watch from "./components/Watch";
import Lists from "./components/Lists";
import SearchResults from "./components/SearchResults";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/info/:id" element={<InfoModel />} />
        <Route path="watch/" element={<Watch />} />
        <Route path="/TopAnime" element={<Lists />} />
        <Route path="/Movies" element={<Lists />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </>
  );
};

export default App;
