'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import styles from './page.module.css'

interface Blog {
  title: string
  slug: string
  content: string
  author: string
  metadesc: string
}

export default function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => {
        setBlogs(data)
        setFilteredBlogs(data)
        setIsLoading(false)
      })
      .catch(err => {
        console.error('Error fetching blogs:', err)
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredBlogs(blogs)
    } else {
      const filtered = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.metadesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredBlogs(filtered)
    }
  }, [searchQuery, blogs])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Blog Posts</h1>
      
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search blogs by title, author, or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className={styles.clearButton}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {isLoading ? (
        <div className={styles.loading}>Loading blogs...</div>
      ) : filteredBlogs.length === 0 ? (
        <div className={styles.noResults}>
          <p>No blogs found matching "{searchQuery}"</p>
          <button onClick={() => setSearchQuery('')} className={styles.resetButton}>
            Clear Search
          </button>
        </div>
      ) : (
        <div className={styles.blogGrid}>
          {filteredBlogs.map((blog, index) => (
            <div 
              key={blog.slug}
              className={styles.blogCard}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link href={`/blogpost/${blog.slug}`} className={styles.blogLink}>
                <h3 className={styles.blogTitle}>{blog.title}</h3>
              </Link>
              <p className={styles.blogAuthor}>By {blog.author}</p>
              <p className={styles.blogDescription}>{blog.metadesc}</p>
              <Link href={`/blogpost/${blog.slug}`} className={styles.readMore}>
                Read More →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}