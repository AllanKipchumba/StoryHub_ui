import React, { useState } from "react";
import styles from "./navbar.module.scss";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { GrFormClose } from "react-icons/gr";
import { NavLink, Link } from "react-router-dom";
import { ShowOnAuth } from "./ShowOnAuth";

//logo
const logo = (
  <div className={`${styles.logo} fixed `}>
    <Link to="/">
      <h2>
        {" "}
        Story<span className="text-[#ff0581]">Hub</span>
      </h2>
    </Link>
  </div>
);
//style active link
const activeLink = ({ isActive }) => isActive && `${styles.active}`;

export const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);
  const hideMenu = () => setShowMenu(false);

  return (
    <header>
      <div className={styles.header}>
        {logo}
        <nav
          className={
            showMenu
              ? `${styles["show-nav"]} fixed z-100`
              : `${styles["hide-nav"]} fixed z-100`
          }
        >
          <div
            className={
              showMenu
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
            onClick={hideMenu}
          ></div>

          <ul onClick={hideMenu}>
            {/* only display on mobile */}
            <li className={styles["logo-mobile"]}>
              {logo}
              <GrFormClose size={30} color="#fff" onClick={hideMenu} />
            </li>

            <li onClick={hideMenu}>
              <NavLink to="/" className={activeLink}>
                Home
              </NavLink>
            </li>

            <li onClick={hideMenu}>
              <NavLink to="/about" className={activeLink}>
                About
              </NavLink>
            </li>

            <li onClick={hideMenu}>
              <NavLink to="/publish" className={activeLink}>
                Publish
              </NavLink>
            </li>
          </ul>
          <div className={styles["header-right"]} onClick={hideMenu}>
            <ShowOnAuth hideMenu={hideMenu} className={activeLink} />
          </div>
        </nav>

        <div className={`${styles["menu-icon"]} object-right fixed z-100`}>
          <HiOutlineMenuAlt2 size={30} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};
