import React from "react";
import "./header.scss";
import { BsFacebook } from "react-icons/bs";
import { FaTwitter, FaGithub } from "react-icons/fa";
import { AiOutlineInstagram } from "react-icons/ai";
import image from "./assests/profile-image.svg";

export const Header = () => {
  return (
    <>
      <div className="header max-w-[1240px] mx-auto grid md:grid-cols-3 gap-2">
        <div className="imageWrapper">
          <img src={image} alt="/" className="image w-[200px] mx-auto my-4 " />
        </div>

        <div className="flex flex-col justify-center md:col-span-2">
          <p className="capitalize md:text-4xl sm:ext-3xl text-2xl mx-auto md:mx-0 font-bold py-2">
            Hey! I'm <span>Allan</span>
          </p>

          <p>
            The Darwinian theory of natural selection holds that it is not the
            strongest of the species that survives, or even the most
            intelligent, but the most adaptable. It’s the same in business: the
            companies that will thrive in the digital economy are those that are
            best able to respond to its demands – in particular, the shift to a
            consumer driven marketplace.
          </p>
          <div className="socials flex mt-8 gap-8">
            <BsFacebook className="icon" />
            <AiOutlineInstagram className="icon" />
            <FaTwitter className="icon" />
            <FaGithub className="icon" />
          </div>
        </div>
      </div>
    </>
  );
};
