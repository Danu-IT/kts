import React from "react";

import classNames from "classnames";

import styles from "./CheckBox.module.scss";

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  checked: boolean | undefined;
  onChange: (value: boolean) => void;
  disabled?: boolean;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  checked,
  onChange,
  disabled,
  ...props
}) => {
  let classInput = classNames(styles.checkbox_box);
  if (!disabled || checked) {
    classInput = classNames(styles.checkbox_box, styles.checkbox_hover);
  }
  return (
    <>
      <label className={styles.checkbox}>
        <input
          {...props}
          disabled={disabled}
          checked={checked ? true : false}
          onChange={(e) => onChange(e.target.checked)}
          className={styles.checkbox_input}
          type="checkbox"
        />
        <span className={classInput}></span>
      </label>
    </>
  );
};

export default CheckBox;
