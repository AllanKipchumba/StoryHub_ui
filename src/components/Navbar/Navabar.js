import React, { useState } from "react";
import styles from "./navbar.module.scss";
import { Link, NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { NoAuth, ShowOnAuth } from "./ShowOnAuth";
import { LOGOUT } from "../../Redux/slices/authSlice";

//re-use jsx
const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        Story<span>Hub</span>
      </h2>
    </Link>
  </div>
);

//style active link
const activeLink = ({ isActive }) => isActive && `${styles.active}`;

export const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrollPage, setscrollPage] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store["auth"]);
  let userName;
  //get name of the logged in user
  if (user !== null) {
    const uEmail = user.user.email;
    userName = uEmail.substring(0, uEmail.indexOf("@"));
  }
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
              <FaTimes
                size={22}
                className={styles["close-icon"]}
                color="#161c1c"
                onClick={hideMenu}
              />
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
              <NavLink to="/publish/write" className={activeLink}>
                Publish
              </NavLink>
            </li>
          </ul>

          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              <ShowOnAuth>
                <li className={styles.uname}>
                  Hi, <b>{userName}</b>
                </li>
                <li
                  onClick={() => {
                    hideMenu();
                    dispatch(LOGOUT());
                  }}
                  style={{ cursor: "pointer" }}
                  className="bg-[#DDDDDD] rounded !px-[15px] !py-[3px]"
                >
                  Logout
                </li>
              </ShowOnAuth>
              <NoAuth>
                <li onClick={hideMenu}>
                  <NavLink
                    to="/signup"
                    className={`${activeLink} bg-[#DDDDDD] rounded !px-[15px] !py-[3px]`}
                  >
                    Sign up
                  </NavLink>
                </li>
                <li onClick={hideMenu}>
                  <NavLink
                    to="/login"
                    className={`${activeLink} bg-[#DDDDDD] rounded !px-[15px] !py-[3px]`}
                  >
                    Login
                  </NavLink>
                </li>
              </NoAuth>
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
