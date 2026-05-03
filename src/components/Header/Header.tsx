import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

function Header() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.link} ${isActive ? styles.active : ''}`

  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.logo}>
        Movie Explorer
      </NavLink>
      <nav className={styles.nav}>
        <NavLink to="/" className={linkClass} end>
          Главная
        </NavLink>
        <NavLink to="/movies" className={linkClass}>
          Фильмы
        </NavLink>
        <NavLink to="/favorites" className={linkClass}>
          Избранное
        </NavLink>
      </nav>
    </header>
  )
}

export default Header
