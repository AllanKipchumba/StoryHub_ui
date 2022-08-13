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
      <div className="about ">
        <div className="grid md:grid-cols-4 gap-6 shadow-lg p-5 mb-10">
          <div className="col-span-2">
            <h1 className="capitalize tracking-[2.72px] mb-3 text-center">
              about story<span className="text-[#ff0581]">hub</span>
            </h1>
            <p className="text-[#292929] mb-4">
              StoryHub is an informational website that allows users to publish
              and access information. <br /> Publish your interests your way.
              Create a unique and elegant blog to share your knowledge,
              experiences, or the latest news.
            </p>
          </div>
          <img src={about} alt="/" className="col-span-2 mb-8" />
        </div>

        <div className="shadow-lg p-5">
          <h1 className="capitalize tracking-[2.72px] mb-3 text-center">
            About the<span className="text-[#ff0581]">Developer</span>
          </h1>
          <div className="grid md:grid-cols-4 mb-6">
            <img
              src={allan}
              alt="/"
              className="w-[30%] md:w-[50%] col-span-1 m-auto"
            />
            <div className="col-span-3">
              <p className=" mt-3 text-[#292929] m-auto">
                Hi, I'm Allan. My friends call me Alano. I am a 4th Year
                Electrical and Electronics Engineering Student at  Moi
                university. <br /> My passion is learning about technology and
                computer software. I enjoy keeping up with the latest technology
                and learning everything I can about how it works. One of my
                biggest strengths is problem solving. I like to confront
                problems front on by devising workable solutions to them.
              </p>
              <h2 className="mt-3 mb-3 tracking-[2.72px]">Find me on</h2>
              <div className="flex ">
                <a href="https://github.com/AllanKipchumba">
                  <AiFillGithub className="icon" />
                </a>
                <a href="https://twitter.com/devAllan_">
                  <AiOutlineTwitter className="icon" />
                </a>
                <a href="https://www.instagram.com/allan_kipchumba/">
                  <AiOutlineInstagram className="icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
