'use client'

import { useEffect, useState } from 'react'
import styles from './page.module.css'

export default function About() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const topics = [
    { icon: '⚡', text: 'JavaScript fundamentals and advanced concepts' },
    { icon: '⚛️', text: 'React and modern front-end development' },
    { icon: '▲', text: 'Next.js for full-stack applications' },
    { icon: '✨', text: 'Best practices and coding standards' },
    { icon: '🚀', text: 'Career advice for developers' },
  ]

  return (
    <div className={`${styles.container} ${isVisible ? styles.fadeIn : ''}`}>
      <h1 className={styles.title}>About Hunting Coder</h1>
      
      <p className={styles.intro}>
        Welcome to <strong>Hunting Coder</strong> - your go-to resource for learning 
        web development, programming, and modern technologies.
      </p>
      
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Our Mission</h2>
        <p className={styles.text}>
          We believe that anyone can learn to code. Our mission is to provide 
          high-quality, easy-to-understand tutorials and guides that help developers 
          of all levels improve their skills.
        </p>
      </section>
      
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What We Cover</h2>
        <ul className={styles.topicList}>
          {topics.map((topic, index) => (
            <li 
              key={index}
              className={styles.topicItem}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className={styles.topicIcon}>{topic.icon}</span>
              <span>{topic.text}</span>
            </li>
          ))}
        </ul>
      </section>
      
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Join Our Community</h2>
        <p className={styles.text}>
          Whether you're just starting out or you're an experienced developer, 
          Hunting Coder has something for you. Happy coding! 🚀
        </p>
      </section>
    </div>
  )
}