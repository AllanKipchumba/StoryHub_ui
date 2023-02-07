import React from "react";
import styles from "./about.module.scss";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiOutlineInstagram,
} from "react-icons/ai";
import { RevealOnScroll } from "../../components/RevealOnScroll/RevealOnScroll";

export const About = () => {
  return (
    <RevealOnScroll>
      <div className={styles.about}>
        <div className={styles.wrapper}>
          <div className="col-span-2">
            <h4>
              about story<span>hub</span>
            </h4>
            <p className="text-[#292929] mb-4 text-justify">
              Stay informed and connect with like-minded individuals through
              StoryHub - a personalized platform for sharing and accessing
              knowledge, experiences, and news updates. Create a stylish blog
              and join the community today.
            </p>
          </div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/storyhub-ced7b.appspot.com/o/images%2F1673853162170undraw_product_tour_re_8bai.png?alt=media&token=b86728f9-625d-4d7b-8958-2f83ec9e9f7c"
            alt="/"
            className="col-span-2 mb-8"
          />
        </div>

        <div className={styles.wrapper}>
          <h4>
            About the<span>Developer</span>
          </h4>
          <div className=" mb-6">
            <div className={styles["shimmer-image"]}>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/storyhub-ced7b.appspot.com/o/images%2F1673852772208devAllan.png?alt=media&token=9faa5577-b8fe-4cf0-8d6b-06237826ac97"
                alt="/"
                className="w-[30%] md:w-[50%] col-span-1 m-auto"
              />
            </div>
            <div className="col-span-3">
              <p className=" mt-3 text-[#292929] m-auto text-justify">
                Meet Allan, a senior Electrical and Electronics Engineering
                Student at Moi University with a passion for technology and
                software. With a strong problem-solving skillset and an
                insatiable curiosity for the latest advancements, Allan
                approaches challenges with creative and effective solutions.
              </p>

              <div className="flex mt-3">
                <a href="https://github.com/AllanKipchumba">
                  <AiFillGithub className={styles.icon} />
                </a>
                <a href="https://twitter.com/devAllan_">
                  <AiOutlineTwitter className={styles.icon} />
                </a>
                <a href="https://www.instagram.com/allan_kipchumba/">
                  <AiOutlineInstagram className={styles.icon} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
};
