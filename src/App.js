import React from "react";
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

//import pages
import { Publish, Signup, Home, About, Login, ReadPost } from "./pages";

//import components
import {
  Footer,
  ScrollButton,
  Navbar,
  Content,
  Authenticated,
  NotAuthenticated,
} from "./components";

const App = () => {
  return (
    <>
      <ToastContainer autoClose={2000} />

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/post/:id" element={<ReadPost />} />
        <Route
          path="/login"
          element={
            <NotAuthenticated>
              <Login />
            </NotAuthenticated>
          }
        />
        <Route
          path="/signup"
          element={
            <NotAuthenticated>
              <Signup />
            </NotAuthenticated>
          }
        />
        <Route
          path="/publish/:id"
          element={
            <Authenticated>
              <Publish />
            </Authenticated>
          }
        />
      </Routes>

      <Content />
      <ScrollButton />
      <Footer />
    </>
  );
};

export default App;
