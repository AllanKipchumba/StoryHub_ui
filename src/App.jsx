import React, { useEffect, useState } from "react";
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
import MoonLoader from "react-spinners/MoonLoader";
import "./app.scss";

const override = {
  display: "block",
  margin: "0 auto",
};

const App = () => {
  const { user } = useSelector((store) => store["logIn"]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    window.addEventListener("load", () => {
      setFetching(false);
    });
    return () =>
      window.removeEventListener("load", () => {
        setFetching(false);
      });
  }, []);

  return fetching ? (
    <MoonLoader
      className="loader"
      loading={fetching}
      color="#ff0581"
      margin={4}
      size={50}
      cssOverride={override}
    />
  ) : (
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
