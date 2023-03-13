import React, { FC } from "react";

import Loader from "components/Loader";
import { LoaderSize } from "type/index";
import classNames from "classnames";

import styles from "./Button.module.scss";

export type ButtonProps = React.PropsWithChildren<{
  loading?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
  color?: string;
  onClick?: () => void;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({
  children,
  loading,
  disabled,
  onClick,
  color,
  ...props
}: ButtonProps) => {
  const classButton = classNames(
    styles.button,
    (loading || disabled) && styles.button_disabled
  );

  return (
    <button
      {...props}
      disabled={loading || disabled}
      onClick={onClick}
      className={
        color === "light"
          ? classNames(classButton, styles.button__light)
          : classButton
      }>
      {loading && (
        <Loader
          color={"white"}
          size={LoaderSize.s}></Loader>
      )}
      {children}
    </button>
  );
};

export default Button;
