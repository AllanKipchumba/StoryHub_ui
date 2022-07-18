import React from "react";
import { Navbar } from "./components/Navbar/Navbar";
import { Header } from "./components/header/Header";
import { Posts } from "./components/posts/Posts";

const App = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Posts />
    </>
  );
};

export default App;
