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
  let classValue = classNames(styles.multiDropdown__check)

  value.forEach((el) => {
    if (el.id === option.id)
      classValue = classNames(styles.multiDropdown__check, styles.checked)
  })

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
          className={classValue}
          type="checkbox"
        ></input>
        <span className={classValue}>{option.name}</span>
      </label>
    </span>
  )
}

export default CustomOption
