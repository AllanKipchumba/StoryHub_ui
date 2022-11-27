import React, { useState } from "react";
import "./navbar.scss";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { GrFormClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import { logout } from "../../Redux/slices/loginSlice";
import { useSelector, useDispatch } from "react-redux";

export const Navbar = () => {
  const { user } = useSelector((store) => store["logIn"]);
  const dispatch = useDispatch();
  const [mobileView, setMobileView] = useState(false);

  const handleClick = () => setMobileView(false);
  return (
    <>
      <nav className="navbar fixed z-100">
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
          <Link to="/">
            Story<span className="text-[#ff0581]">Hub</span>
          </Link>
        </h3>

        <ul className={mobileView ? "nav-links-mobile" : "nav-links"}>
          <li onClick={handleClick} className="link">
            <Link to="/">Home</Link>
          </li>

          <li onClick={handleClick} className="link">
            <Link to="/about">About</Link>
          </li>

          <li onClick={handleClick} className="link">
            <Link to="/write">Publish</Link>
          </li>

          {user ? (
            <li
              onClick={() => {
                handleClick();
                dispatch(logout());
                window.location.replace("/");
              }}
              className="link"
            >
              logout
            </li>
          ) : (
            <>
              <li onClick={handleClick} className="link">
                <Link to="/signup">sign up</Link>
              </li>
              <li onClick={handleClick} className="link">
                <Link to="/login">login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>{" "}
    </>
  );
};
