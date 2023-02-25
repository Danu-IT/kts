import React, { FC, Dispatch, SetStateAction } from "react";

import { navRoutes } from "@components/Router/Router";
import classNames from "classnames";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import styles from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
  style?: boolean;
  visible?: () => void;
}

const Navbar: FC<NavbarProps> = ({ className, style, visible }) => {
  const location = useLocation();
  let classname = styles.navbar;
  if (style) {
    classname = styles.navbar_adaptive;
  }
  return (
    <nav className={`${classname} ${className}`}>
      {navRoutes.map((elem) => (
        <Link
          onClick={visible}
          className={
            elem.path === location.pathname ? styles.navbar_active : ""
          }
          key={elem.path}
          to={elem.path}
        >
          {elem.name}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
