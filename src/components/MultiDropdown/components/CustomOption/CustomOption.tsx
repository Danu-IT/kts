import React, { FC } from 'react'

import { Option } from '@type/index'
import classNames from 'classnames'

import styles from './CustomOption.module.scss'

interface OptionProps {
  value: Option[]
  option: Option
  onChange: (value: Option[]) => void
}

const CustomOption: FC<OptionProps> = ({ value, option, onChange }) => {
  const isSelected = value.some(({ id }) => id === option.id)

  const className = classNames(
    styles.multiDropdown__check,
    isSelected && styles.checked
  )

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    option: Option
  ) => {
    if (e.target.checked) {
      onChange(value.filter((o) => o.id !== option.id))
    } else {
      onChange([...value, option])
    }
  }

  return (
    <span className={styles.multiDropdown__item}>
      <label style={{ display: 'block' }}>
        <input
          onChange={(e) => handleChange(e, option)}
          defaultChecked
          className={className}
          type="checkbox"
        ></input>
        <span className={className}>{option.name}</span>
      </label>
    </span>
  )
}

export default CustomOption
