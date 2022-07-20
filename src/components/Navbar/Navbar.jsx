import React, { useState } from "react";
import "./navbar.scss";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { GrFormClose } from "react-icons/gr";

export const Navbar = () => {
  const [mobileView, setMobileView] = useState(false);
  const [user, setuser] = useState(false);

  const handleClick = () => setMobileView(false);
  return (
    <>
      <nav className="navbar">
        <button
          className="mobile-menu-icon"
          onClick={() => setMobileView(!mobileView)}
        >
          {mobileView ? (
            <GrFormClose size={30} />
          ) : (
            <HiOutlineMenuAlt2 size={30} />
          )}
        </button>

        <h3 className="logo">
          Story<span className="text-[#ff0581]">Hub</span>
        </h3>

        <ul className={mobileView ? "nav-links-mobile" : "nav-links"}>
          <li onClick={handleClick} className="link"></li>
          <li onClick={handleClick} className="link">
            About
          </li>
          <li onClick={handleClick} className="link">
            write
          </li>
          {user ? (
            <li onClick={handleClick} className="link">
              logout
            </li>
          ) : (
            <>
              <li onClick={handleClick} className="link">
                sign up
              </li>
              <li onClick={handleClick} className="link">
                login
              </li>
            </>
          )}
        </ul>
      </nav>{" "}
    </>
  );
};
