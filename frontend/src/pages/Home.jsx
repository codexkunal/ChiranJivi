import React from "react";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctors from "../components/TopDoctors";
import MentalBanner from "../components/MentalBanner"
import Banner from "../components/Banner";

const Home = () => {
  return (
    <div>
      <Header />
      <MentalBanner/>
      <SpecialityMenu/>
      <TopDoctors />
      <Banner/>
    </div>
  );
};

export default Home;