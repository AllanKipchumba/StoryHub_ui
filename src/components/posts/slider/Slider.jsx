import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
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
              <div className="grid md:grid-cols-2  gap-4">
                <div className="img-container">
                  <img src={imageURL} alt={title} />
                </div>
                <div>
                  <h1>
                    <Link to={`/post/${post._id}`}>{title}</Link>
                  </h1>
                  <Timestamp createdAt={createdAt} />
                  <p>{shortenedDescription}</p>

                  <div>
                    <AiOutlineArrowLeft
                      className="arrow prev"
                      onClick={prevSlide}
                    />
                    <AiOutlineArrowRight
                      className="arrow next"
                      onClick={nextSlide}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
