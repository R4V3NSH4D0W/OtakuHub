import React from "react";
import Slider from "../components/Slider";
import Card from "../components/Card";
import request from "../Request";
const Home = () => {
  return (
    <>
      <Slider />
      <Card name="Trending Anime" URL={request.requestTrending} />
    </>
  );
};

export default Home;
