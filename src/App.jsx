import React from "react";
import { Navbar } from "./components/Navbar/Navbar";
import { ScrollButon } from "./components/scrollButton/ScrollButon";
import { Content } from "./components/scrollButton/Styles";
import { Home } from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/login/Login";
import { Signup } from "./pages/signUp/Signup";
import { Write } from "./pages/write/Write";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/write" element={<Write />} />
      </Routes>

      <Content />
      <ScrollButon />
    </>
  );
};

export default App;
