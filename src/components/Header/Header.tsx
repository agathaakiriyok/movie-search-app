import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.link} ${isActive ? styles.active : ''}`

  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
        Movie Explorer
      </NavLink>

      <button
        className={styles.burger}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Открыть меню"
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
        <NavLink to="/" className={linkClass} end onClick={() => setMenuOpen(false)}>
          Главная
        </NavLink>
        <NavLink to="/movies" className={linkClass} onClick={() => setMenuOpen(false)}>
          Фильмы
        </NavLink>
        <NavLink to="/favorites" className={linkClass} onClick={() => setMenuOpen(false)}>
          Избранное
        </NavLink>
      </nav>
    </header>
  )
}

export default Header
