import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FundDetails from "../pages/FundDetail";
import Home from "../pages/Home";
import Splash from "../pages/Splash";
const RoutesContainer = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/splash" element={<Splash />} />

        <Route path="/" element={<Home />} />

        <Route path="/funddetail" element={<FundDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesContainer;
