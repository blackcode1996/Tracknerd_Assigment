import React from "react";

import { Route, Routes } from "react-router-dom";


import Home from "../Home/Home";
import Track from "../Track/Track";
import Navbar from "../../Components/Navbar/Navbar";
import List from "../List/List";

const AllRoutes = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/list" element={<List />}></Route>
        <Route path="/track" element={<Track />}></Route>
      </Routes>
    </>
  );
};

export default AllRoutes;
