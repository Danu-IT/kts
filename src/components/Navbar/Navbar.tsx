import { FC } from 'react'

import { navRoutes } from '@components/Router/Router'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import styles from './Navbar.module.scss'

interface NavbarProps {
  className?: string
  style?: boolean
  toggle?: () => void
}

const Navbar: FC<NavbarProps> = ({ className, style, toggle }) => {
  const location = useLocation()
  let classname = styles.navbar
  if (style) {
    classname = styles.navbar_adaptive
  }
  return (
    <nav className={`${classname} ${className}`}>
      {navRoutes.map((elem) => (
        <Link
          onClick={toggle}
          className={
            elem.path === location.pathname ? styles.navbar_active : ''
          }
          key={elem.path}
          to={elem.path}
        >
          {elem.name}
        </Link>
      ))}
    </nav>
  )
}

export default Navbar
