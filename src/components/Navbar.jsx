import { useEffect, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { useLanguage } from '../context/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'

const SECTIONS = ['home', 'about', 'skills', 'projects', 'education', 'contact']

export default function Navbar() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <a href="#home" className="logo">
          Abderrahim<span className="accent">.</span>
        </a>

        <nav
          id="primary-nav"
          className={`nav-links${open ? ' is-open' : ''}`}
          aria-label={t.nav.mainMenu}
        >
          {SECTIONS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`nav-link${active === id ? ' active' : ''}`}
              aria-current={active === id ? 'true' : undefined}
              onClick={() => setOpen(false)}
            >
              {t.nav[id]}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            type="button"
            className="icon-btn menu-btn"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="primary-nav"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          >
            {open ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  )
}
