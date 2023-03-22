import React, { FC } from "react";

import { navRoutes } from "components/Router/Router";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import styles from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
  adaptive?: boolean;
  toggle?: () => void;
}

const Navbar: FC<NavbarProps> = ({ className, adaptive, toggle }) => {
  const location = useLocation();
  return (
    <nav
      className={classNames(
        className,
        adaptive ? styles.navbar_adaptive : styles.navbar
      )}>
      {navRoutes.map((elem) => (
        <Link
          onClick={toggle}
          className={
            elem.path === location.pathname ? styles.navbar_active : ""
          }
          key={elem.path}
          to={elem.path}>
          {elem.name}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
