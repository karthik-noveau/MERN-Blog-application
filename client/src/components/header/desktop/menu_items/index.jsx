import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./style.module.css";
import { LastMenuItem } from "../last_menu_item";

export const MenuItems = (props) => {
  const { isLastmenu, loginInfo, handleLogout } = props;
  const navigate = useNavigate();

  return (
    <div className={styles.menuWrapper}>
      {loginInfo?.id && (
        <React.Fragment>
          <p className={styles.menuItem} onClick={() => navigate("/all-blogs")}>
            Blogs
          </p>
          <p
            className={styles.menuItem}
            onClick={() => navigate("/user-blogs")}
          >
            My Blogs
          </p>
          <p
            className={styles.menuItem}
            onClick={() => navigate("/create-blog")}
          >
            Create Blog
          </p>
        </React.Fragment>
      )}
      {!loginInfo?.id && (
        <React.Fragment>
          <p className={styles.menuItem} onClick={() => navigate("/login")}>
            Login
          </p>
          <p className={styles.menuItem} onClick={() => navigate("/register")}>
            register
          </p>
        </React.Fragment>
      )}
      {isLastmenu && loginInfo?.id && (
        <LastMenuItem handleLogout={handleLogout} />
      )}
    </div>
  );
};
