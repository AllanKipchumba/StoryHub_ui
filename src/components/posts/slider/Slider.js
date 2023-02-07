import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import styles from "./slider.module.scss";
import { Link } from "react-router-dom";
import { Timestamp } from "../Timestamp";

export const Slider = () => {
  const { posts } = useSelector((store) => store["posts"]);

  //shuffle posts
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  const randomPosts = shuffleArray(posts.slice());

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

  const autoscroll = true;
  let slideInterval;
  let intervalTime = 5000;

  const auto = () => {
    slideInterval = setInterval(nextSlide, intervalTime);
  };

  useEffect(() => {
    autoscroll && auto();
    return () => clearInterval(slideInterval);
  });

  return (
    <div className={styles.slider}>
      {randomPosts.map((post, index) => {
        const { title: originalTitle, description, createdAt, category } = post;
        let title;

        originalTitle.length < 15
          ? (title = originalTitle)
          : (title = originalTitle.substring(0, 30).concat("..."));

        const shortenedDescription = description
          .substring(0, 100)
          .concat("...");
        return (
          <div
            key={index}
            className={
              index === currentSlide
                ? `${styles.slide} ${styles.current}`
                : `${styles.slide}`
            }
          >
            {index === currentSlide && (
              <div className="grid lg:grid-cols-2 gap-8">
                {/* CONT */}
                <div className={styles.content}>
                  <div className="line-subtitle">
                    <div className="line"></div>
                    <div className="subtitle">{category}</div>
                  </div>
                  <h1 className={styles["hero-title"]}>
                    <Link to={`/post/${post._id}`}>{title}</Link>
                  </h1>
                  <Timestamp createdAt={createdAt} />
                  <hr />
                  <div className="mt-3 break-all">
                    <p>{shortenedDescription}</p>
                  </div>

                  <div className={styles.icons}>
                    <FaAngleLeft
                      size={35}
                      className={`${styles.arrow} }`}
                      onClick={prevSlide}
                    />
                    <FaAngleRight
                      size={35}
                      className={`${styles.arrow} `}
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
