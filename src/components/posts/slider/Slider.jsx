import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "./slider.scss";
import { Link } from "react-router-dom";
import { Timestamp } from "../Timestamp";

export const Slider = () => {
  const { posts } = useSelector((store) => store["posts"]);
  //select 3 random posts
  const randomPosts = posts
    .slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = randomPosts.length;

  useEffect(() => {
    setCurrentSlide(0);
  }, []);
  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };
  //   //autoscroll functionality
  //   const autoscroll = true;
  //   let slideInterval;
  //   let intervalTime = 5000;

  //   const auto = () => {
  //     slideInterval = setInterval(nextSlide, intervalTime);
  //   };

  //   useEffect(() => {
  //     autoscroll && auto();

  //     // Before the effect is applied again, clear any previously-set intervals that were started by the setInterval() function
  //     return () => clearInterval(slideInterval);
  //   }, [currentSlide, autoscroll, slideInterval]);

  return (
    <div className="slider">
      {randomPosts.map((post, index) => {
        const { title, description, imageURL, createdAt } = post;
        const shortenedDescription = description
          .substring(0, 200)
          .concat("...");
        return (
          <div
            key={index}
            className={index === currentSlide ? "slide current" : "slide"}
          >
            {index === currentSlide && (
              <div className="grid lg:grid-cols-2 gap-8">
                {/* CONT */}
                <div className="content">
                  <h1>
                    <Link to={`/post/${post._id}`}>{title}</Link>
                  </h1>
                  <Timestamp createdAt={createdAt} />
                  <hr />
                  <div className="mt-3 break-all">
                    <p>{shortenedDescription}</p>
                  </div>

                  {/* ICONS */}
                  <FaAngleLeft
                    size={30}
                    className="arrow prev"
                    onClick={prevSlide}
                  />
                  <FaAngleRight
                    size={30}
                    className="arrow next"
                    onClick={nextSlide}
                  />
                </div>

                {/* IMAGE
                <img
                  src={imageURL}
                  alt={title}
                  className="max-w-full h-auto grid  sm:hidden"
                /> */}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
