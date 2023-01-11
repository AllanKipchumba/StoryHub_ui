import React, { useEffect, useState } from "react";
import styles from "./navbar.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ShowOnAuth } from "./ShowOnAuth";

//re-use jsx
const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        Story<span className="text-[#ff0581]">Hub</span>
      </h2>
    </Link>
  </div>
);

//style active link
const activeLink = ({ isActive }) => isActive && `${styles.active}`;

export const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrollPage, setscrollPage] = useState(false);

  //make Navbar sticky
  const fixNavBar = () => {
    window.scrollY > 50 ? setscrollPage(true) : setscrollPage(false);
  };
  //add scroll event listener on the window
  window.addEventListener("scroll", fixNavBar);

  //monitor currently signed in user

  const toggleMenu = () => setShowMenu(!showMenu);
  const hideMenu = () => setShowMenu(false);

  return (
    <header className={scrollPage && `${styles.fixed}`}>
      <div className={styles.header}>
        {logo}

        <nav
          className={
            showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
          }
        >
          <div
            className={
              showMenu
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
            onClick={hideMenu}
          >
            {" "}
          </div>

          <ul onClick={hideMenu}>
            {/* only display on mobile */}
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color="#fff" onClick={hideMenu} />
            </li>

            <li>
              <NavLink to="/" className={activeLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={activeLink}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/publish" className={activeLink}>
                Publish
              </NavLink>
            </li>
          </ul>

          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              <ShowOnAuth hideMenu={hideMenu} className={activeLink} />
            </span>
          </div>
        </nav>

        {/* Navigation for mobile */}
        <div className={styles["menu-icon"]}>
          <HiOutlineMenuAlt2 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};
