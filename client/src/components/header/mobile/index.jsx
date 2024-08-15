import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sling as Hamburger } from "hamburger-react";

import styles from "./style.module.css";
import "./hamburger.override.css";
import "./aos.style.css";

export const MobileHeader = ({ loginInfo, handleLogout }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [navSize, setNavSize] = useState("70px");
  const [navColor, setNavColor] = useState("white");
  const [fontColor, setFontColor] = useState("#e2e2e2");

  const location = useLocation();

  const listenScrollEvent = () => {
    if (window.scrollY > 10) {
      setNavColor("white");
      setNavSize("80px");
      setFontColor("white");
    } else {
      setNavColor("white");
      setNavSize("70px");
      setFontColor("#e2e2e2");
    }
  };

  // scroll animation
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  //open and close animation
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const onMenuClick = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <React.Fragment>
      <div
        className={styles.headerWrapper}
        style={{
          backgroundColor: navColor,
          height: navSize,
          transition: "all 0.5s",
        }}
      >
        <div className={styles.leftInfo}>
          <Link to="/all-blogs" onClick={() => setIsOpen(false)}>
            <p>Noveau Blog</p>
          </Link>
        </div>
        <div
          className={`${styles.rightInfo} hamburgerMenu ${
            isOpen ? "closeIcon" : "openIcon"
          }`}
        >
          <Hamburger
            direction="right"
            duration={0.7}
            size={29.2}
            toggled={isOpen}
            toggle={() => setIsOpen(!isOpen)}
          />
        </div>
      </div>

      <div
        className={`${styles.popup} ${
          isOpen ? styles.popupShow : styles.popupHide
        }`}
      >
        <div className={styles.menuContainer}>
          <div
            className={styles.menuItemsContainer}
            style={{ color: fontColor }}
          >
            {loginInfo?.id && (
              <React.Fragment>
                <p
                  className={`${styles.menuItem} ${
                    isOpen ? "sui-aos-down1" : "sui-aos-up"
                  } ${location.pathname === "/all-blogs" ? styles.active : ""}`}
                  onClick={() => onMenuClick("/all-blogs")}
                >
                  Blogs
                </p>
                <p
                  className={`${styles.menuItem} ${
                    isOpen ? "sui-aos-down2" : "sui-aos-up"
                  } ${
                    location.pathname === "/user-blogs" ? styles.active : ""
                  }`}
                  onClick={() => onMenuClick("/user-blogs")}
                >
                  My Blogs
                </p>
                <p
                  className={`${styles.menuItem} ${
                    isOpen ? "sui-aos-down3" : "sui-aos-up"
                  } ${
                    location.pathname === "/create-blog" ? styles.active : ""
                  }`}
                  onClick={() => onMenuClick("/create-blog")}
                >
                  Create Blog
                </p>
              </React.Fragment>
            )}
            {!loginInfo?.id && (
              <React.Fragment>
                <p
                  className={`${styles.menuItem} ${
                    isOpen ? "sui-aos-down3" : "sui-aos-up"
                  } ${location.pathname === "/login" ? styles.active : ""}`}
                  onClick={() => onMenuClick("/login")}
                >
                  Login
                </p>

                <p
                  className={`${styles.menuItem} ${
                    isOpen ? "sui-aos-down3" : "sui-aos-up"
                  } ${location.pathname === "/register" ? styles.active : ""}`}
                  onClick={() => onMenuClick("/register")}
                >
                  Register
                </p>
              </React.Fragment>
            )}
          </div>
          <div
            className={`${styles.lastItem} ${
              isOpen ? "sui-aos-down4" : "sui-aos-up"
            }`}
            onClick={() => {
              handleLogout();
              onMenuClick("/login");
            }}
          >
            Logout
          </div>
        </div>
      </div>

      {/* static space  */}
      {/* <div
        style={{
          backgroundColor: navColor,
          height: navSize,
          transition: "all 0.5s",
        }}
      /> */}
    </React.Fragment>
  );
};
