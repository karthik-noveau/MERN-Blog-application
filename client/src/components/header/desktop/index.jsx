import { useNavigate } from "react-router-dom";

import { MenuItems } from "./menu_items/index.jsx";
import { LastMenuItem } from "./last_menu_item/index.jsx";

import styles from "./style.module.css";
import { useMemo } from "react";

export const CenterMenu = (props) => {
  return (
    <>
      <MenuItems {...props} />
      <LastMenuItem {...props} />
    </>
  );
};

export const RightMenu = (props) => {
  return <MenuItems {...props} />;
};

export const DeskNavbar = (props) => {
  const navigate = useNavigate();
  //controls
  let isCenterMenu = false;
  let isShowLogoImg = false;

  const menuRender = useMemo(() => {
    if (isCenterMenu) {
      return <CenterMenu {...props} isLastmenu={false} />;
    } else {
      return <RightMenu {...props} isLastmenu={true} />;
    }
  }, [isCenterMenu, props]);

  return (
    <div
      className={`${styles.headerContainer} ${
        isCenterMenu ? styles.centerMenuWrapper : styles.rightMenuWrapper
      }`}
    >
      {/* logo */}
      <div className={styles.logoContainer} onClick={() => navigate("/all-blogs")}>
        {isShowLogoImg && <img src="" alt="logo" />}
        {!isShowLogoImg && <p>Noveau Blog</p>}
      </div>
      {/* render menu */}
      {menuRender}
    </div>
  );
};
