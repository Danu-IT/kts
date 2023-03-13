import React, { FC } from "react";

import Button from "components/Button";
import classNames from "classnames";
import { RiSearch2Line } from "react-icons/ri";

import styles from "./Input.module.scss";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  button?: string;
  icons: boolean;
  handleFind: () => void;
};

const Input: FC<InputProps> = ({
  value,
  onChange,
  disabled,
  button,
  icons,
  handleFind,
  ...props
}: InputProps) => {
  let classInput = classNames(styles.input);
  if (disabled) {
    classInput = classNames(styles.input, styles.input_disabled);
  }
  if (button) {
    classInput = classNames(styles.input, styles.input_width);
  }
  return (
    <label className={styles.input__cont}>
      {icons && <RiSearch2Line className={styles.input__icons}></RiSearch2Line>}
      <input
        {...props}
        disabled={disabled}
        className={`${classInput} ${props.className}`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type="text"
      />
      {button && (
        <div className={styles.input__btn}>
          <Button onClick={handleFind}>{button}</Button>
        </div>
      )}
    </label>
  );
};

export default Input;
