import React from "react";
import { Navbar } from "./components/Navbar/Navbar";
import { ScrollButon } from "./components/scrollButton/ScrollButon";
import { Content } from "./components/scrollButton/Styles";
import { Home } from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/login/Login";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Content />
      <ScrollButon />
    </>
  );
};

export default App;
