import React, { FC, useState } from 'react'

import Navbar from '@components/Navbar'
import Logo from '@images/Logo.svg'
import { log } from '@utils/index'
import { AiOutlineClose } from 'react-icons/ai'
import { BiUser } from 'react-icons/bi'
import { BsHandbag } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'

import styles from './Header.module.scss'

const Header: FC = () => {
  const [visibleMenu, setVisibleMenu] = useState<boolean>(false)
  const toggleBurgerMenu = () => {
    setVisibleMenu((prev) => !prev)
  }
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.header__logo}>
          <img className={styles.header__logo_mg} src={Logo} alt="" />
          <span className={styles.header__logo_text}>Lalasia</span>
        </div>
        <Navbar style={false} className={styles.header__navbar}></Navbar>
        <div className={styles.header__icons}>
          <BsHandbag width={30} height={30}></BsHandbag>
          <BiUser width={30} height={30}></BiUser>
        </div>
        <GiHamburgerMenu
          onClick={toggleBurgerMenu}
          className={styles.header__burger}
          size={30}
        ></GiHamburgerMenu>
        {visibleMenu && (
          <div className={styles.header__menu}>
            <div className={styles.header__menu_content}>
              <AiOutlineClose
                className={styles.header__menu_close}
                onClick={toggleBurgerMenu}
              ></AiOutlineClose>
              <Navbar
                toggle={toggleBurgerMenu}
                style={true}
                className={styles.header__navbar}
              ></Navbar>
            </div>
          </div>
        )}
      </div>
      <hr className={styles.header__line}></hr>
    </div>
  )
}

export default Header
