import React from "react";
import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | Task Management</title>
      </Helmet>
      <Banner />
    </div>
  );
};

export default Home;
