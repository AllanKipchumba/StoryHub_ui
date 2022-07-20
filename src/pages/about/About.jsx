import React from "react";
import "./about.scss";
import about from "./assets/about.svg";
import allan from "./assets/devAllan.png";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiOutlineInstagram,
} from "react-icons/ai";

export const About = () => {
  return (
    <>
      <div className="about">
        <div>
          <h1>
            about story<span>hub</span>
          </h1>
          <p>
            StoryHub is an informational website that allows users to publish
            and access information. Publish your interests your way. Create a
            unique and elegant blog to share your knowledge, experiences, or the
            newest news.
          </p>
          <img src={about} alt="/" />
        </div>

        <div>
          <h1>About the Developer</h1>
          <div>
            <img src={allan} alt="/" className="w-[15%]" />
            <p>
              I am a 4th Year Electrical and Electronics Engineering Student at
               Moi university. My passion is learning about technology and
              computer software. I enjoy keeping up with the latest technology
              and learning everything I can about how it works. One of my
              biggest strengths is problem solving. I like to confront problems
              front on by devising workable solutions to them.
            </p>
          </div>
          <h2>Find me on</h2>
          <div>
            <AiFillGithub />
            <AiOutlineTwitter />
            <AiOutlineInstagram />
          </div>
        </div>
      </div>
    </>
  );
};
