import React from "react";
import { Navbar } from "./components/Navbar/Navbar";
import { Header } from "./components/header/Header";
import { Posts } from "./components/posts/Posts";
import { ScrollButon } from "./components/scrollButton/ScrollButon";
import { Content } from "./components/scrollButton/Styles";

const App = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Posts />

      <Content />
      <ScrollButon />
    </>
  );
};

export default App;
