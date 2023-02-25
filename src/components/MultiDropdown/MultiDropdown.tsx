import React, { FC, useState } from "react";

import { Option } from "@type/index";
import classNames from "classnames";
import { FiFilter } from "react-icons/fi";

import styles from "./MultiDropdown.module.scss";

export type MultiDropdownProps = {
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  pluralizeOptions: (value: Option[]) => string;
};

const MultiDropdown: FC<MultiDropdownProps> = ({
  options,
  onChange,
  pluralizeOptions,
  value,
  disabled,
}: MultiDropdownProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const dropDown = () => setVisible((prev) => (prev = !prev));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    option: Option
  ) => {
    if (e.target.checked) {
      onChange(value.filter((o) => o.key !== option.key));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className={styles.multiDropdown}>
      <label className={styles.multiDropdown__btn_container}>
        <input
          disabled={disabled}
          onClick={dropDown}
          className={styles.multiDropdown__btn}
          type="button"
          defaultValue={pluralizeOptions(value)}
        ></input>
        <FiFilter className={styles.multiDropdown__filter}></FiFilter>
      </label>
      {visible && (
        <div className={styles.multiDropdown__list}>
          {!disabled &&
            options.map((option) => {
              let classValue = classNames(styles.multiDropdown__check);
              value.forEach((el) => {
                if (el.key === option.key)
                  classValue = classNames(
                    styles.multiDropdown__check,
                    styles.checked
                  );
              });
              return (
                <span key={option.key} className={styles.multiDropdown__item}>
                  <label>
                    <input
                      onChange={(e) => handleChange(e, option)}
                      className={classValue}
                      type="checkbox"
                    ></input>
                    <span className={classValue}>{option.value}</span>
                  </label>
                </span>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;
