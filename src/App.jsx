import "./app.scss";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import MoonLoader from "react-spinners/MoonLoader";
import { Routes, Route } from "react-router-dom";

//import pages
import { Publish, Signup, Home, About, Login, ReadPost } from "./pages";

//import components
import { Footer, ScrollButton, Navbar, Content } from "./components";

const override = {
  display: "block",
  margin: "0 auto",
};

const App = () => {
  const { user } = useSelector((store) => store["logIn"]);
  const [fetching, setFetching] = useState(true);

  //load moonLoader for 700ms on-load
  setTimeout(() => {
    setFetching(false);
  }, 700);

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
        <Route path="/post/:id" element={user ? <ReadPost /> : <Login />} />
        <Route path="/login" element={!user ? <Login /> : <Home />} />
        <Route path="/signup" element={!user ? <Signup /> : <Home />} />
        <Route path="/write" element={user ? <Publish /> : <Login />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <Content />
      <ScrollButton />
      <Footer />
    </>
  );
};

export default App;
