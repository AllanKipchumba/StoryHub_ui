import React from "react";
import { Navbar } from "./components/Navbar/Navbar";
import { ScrollButon } from "./components/scrollButton/ScrollButon";
import { Content } from "./components/scrollButton/Styles";
import { Home } from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/login/Login";
import { Signup } from "./pages/signUp/Signup";
import { Write } from "./pages/write/Write";
import { About } from "./pages/about/About";
import { Footer } from "./components/footer/Footer";
import { ReadPost } from "./pages/IndividualPost/ReadPost";
import { useSelector } from "react-redux";
const App = () => {
  const { user } = useSelector((store) => store["logIn"]);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={user ? <ReadPost /> : <Home />} />
        <Route path="/login" element={!user ? <Login /> : <Home />} />
        <Route path="/signup" element={!user ? <Signup /> : <Home />} />
        <Route path="/write" element={user ? <Write /> : <Home />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <Content />
      <ScrollButon />
      <Footer />
    </>
  );
};

export default App;
