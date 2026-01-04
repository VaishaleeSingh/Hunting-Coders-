'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { toggleTheme } from '@/store/themeSlice'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const theme = useAppSelector((state) => state.theme.theme)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleThemeToggle = () => {
    dispatch(toggleTheme())
  }

  const isActive = (path) => pathname === path

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo}>
        <Link href="/">Hunting Coder</Link>
      </div>
      <div className={styles.navRight}>
        <button
          className={styles.themeToggle}
          onClick={handleThemeToggle}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          )}
        </button>
        <button 
          className={styles.menuToggle}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={isMenuOpen ? styles.open : ''}></span>
          <span className={isMenuOpen ? styles.open : ''}></span>
          <span className={isMenuOpen ? styles.open : ''}></span>
        </button>
      </div>
      <ul className={`${styles.navLinks} ${isMenuOpen ? styles.menuOpen : ''}`}>
        <li>
          <Link 
            href="/" 
            className={isActive('/') ? styles.active : ''}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            href="/blog" 
            className={isActive('/blog') ? styles.active : ''}
            onClick={() => setIsMenuOpen(false)}
          >
            Blog
          </Link>
        </li>
        <li>
          <Link 
            href="/about" 
            className={isActive('/about') ? styles.active : ''}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
        </li>
        <li>
          <Link 
            href="/contact" 
            className={isActive('/contact') ? styles.active : ''}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  )
}