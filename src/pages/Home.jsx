import React from "react";
import Slider from "../components/Slider";
import Card from "../components/Card";
import request from "../Request";
import Row from "../components/Row";
const Home = () => {
  return (
    <>
      <Slider />
      <Card name="Highest Rated Anime" />
      {/* <Row rowID="1" title="New Season" URL={request.requestnewSeason} /> */}
      {/* <Row rowID="2" title="New Episodes" URL={request.requestEpisodes} /> */}
    </>
  );
};

export default Home;
