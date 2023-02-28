import { FC } from "react";

import { LoaderSize } from "@type/index";
import classNames from "classnames";

import styles from "./Loader.module.scss";

export type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
  color?: string;
};

const Loader: FC<LoaderProps> = ({
  loading = true,
  size = LoaderSize.m,
  className,
  color,
}: LoaderProps) => {
  if (!loading) {
    return null;
  }

  const loaderClassName = classNames(styles.testClass, className, {
    [styles.small]: size === "s",
    [styles.large]: size === "l",
  });

  return (
    <div
      style={{
        borderColor: color,
        borderBottomColor: "transparent",
      }}
      className={loaderClassName}
    ></div>
  );
};

export default Loader;
