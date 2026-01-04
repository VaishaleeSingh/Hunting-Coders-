import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>&copy; 2024 Hunting Coder. All rights reserved.</p>
      <p className={styles.footerText}>
        Keep hunting for knowledge! 💻
      </p>
    </footer>
  )
}