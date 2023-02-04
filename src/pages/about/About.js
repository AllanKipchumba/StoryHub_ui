import React from "react";
import styles from "./about.module.scss";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiOutlineInstagram,
} from "react-icons/ai";

export const About = () => {
  return (
    <>
      <div className={styles.about}>
        <div className={styles.wrapper}>
          <div className="col-span-2">
            <h4>
              about story<span>hub</span>
            </h4>
            <p className="text-[#292929] mb-4 text-justify">
              StoryHub is an informational website that enables users to share
              and access information. Create a personalized and stylish blog to
              share your knowledge, experiences, or latest news.
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
            <img
              src="https://firebasestorage.googleapis.com/v0/b/storyhub-ced7b.appspot.com/o/images%2F1673852772208devAllan.png?alt=media&token=9faa5577-b8fe-4cf0-8d6b-06237826ac97"
              alt="/"
              className="w-[30%] md:w-[50%] col-span-1 m-auto"
            />
            <div className="col-span-3">
              <p className=" mt-3 text-[#292929] m-auto text-justify">
                Meet Allan, an Electrical and Electronics Engineering Student at
                Moi University. Allan is passionate about technology and
                computer software and enjoys staying updated on the latest
                advancements. He is skilled in problem-solving and tackling
                issues head-on by finding practical solutions.
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
    </>
  );
};
