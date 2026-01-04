'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './page.module.css'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const blogPosts = [
    {
      slug: 'how-to-learn-javascript',
      title: 'How to Learn JavaScript 🚀',
      description: 'JavaScript is the language used to design logic for the web. Learn it step by step.',
    },
    {
      slug: 'how-to-learn-react',
      title: 'How to Learn React ⚛️',
      description: 'React is the most popular JavaScript library for building user interfaces.',
    },
    {
      slug: 'how-to-learn-nextjs',
      title: 'How to Learn Next.js ▲',
      description: 'Next.js is the React framework for production. Build full-stack applications.',
    },
  ]

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={`${styles.hero} ${isVisible ? styles.fadeIn : ''}`}>
          <h1 className={styles.title}>
            Welcome to <span className={styles.highlight}>Hunting Coder</span>
          </h1>
          <p className={styles.description}>
            A blog for hunting coders by a hunting coder
          </p>
        </div>
        
        <div className={`${styles.imageContainer} ${isVisible ? styles.slideUp : ''}`}>
          <img src="/huntingcoding.png" alt="Coding" className={styles.mainImage} />
        </div>

        <div className={styles.blogs}>
          <h2 className={styles.sectionTitle}>Latest Blogs</h2>
          
          <div className={styles.blogGrid}>
            {blogPosts.map((blog, index) => (
              <div 
                key={blog.slug}
                className={styles.blogItem}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link href={`/blogpost/${blog.slug}`}>
                  <h3>{blog.title}</h3>
                </Link>
                <p>{blog.description}</p>
                <Link href={`/blogpost/${blog.slug}`} className={styles.readMore}>
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}