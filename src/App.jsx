import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import InfoModel from "./components/InfoModel";
import Watch from "./components/Watch";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info/:id" element={<InfoModel />} />
        <Route path="watch/:id" element={<Watch />} />
      </Routes>
    </>
  );
};

export default App;
