import React, { FC, useState } from "react";

import { Option } from "type/index";
import { FiFilter } from "react-icons/fi";

import CustomOption from "./components/CustomOption/CustomOption";
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
  const dropDown = () => setVisible((prev) => !prev);

  return (
    <div className={styles.multiDropdown}>
      <label className={styles.multiDropdown__btn_container}>
        <input
          disabled={disabled}
          onClick={dropDown}
          className={styles.multiDropdown__btn}
          type="button"></input>
        {pluralizeOptions(value)}
        {!value.length && (
          <FiFilter className={styles.multiDropdown__filter}></FiFilter>
        )}
      </label>
      {visible && (
        <div className={styles.multiDropdown__list}>
          {!disabled &&
            options.map((option) => (
              <CustomOption
                key={option.id}
                option={option}
                value={value}
                onChange={onChange}></CustomOption>
            ))}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;
