import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { calculateReadingTime } from '@/app/utils/readingTime'
import styles from './page.module.css'

interface Blog {
  title: string
  slug: string
  content: string
  author: string
  metadesc: string
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const filePath = path.join(process.cwd(), 'blogdata', `${slug}.json`)
  const content = fs.readFileSync(filePath, 'utf-8')
  const blog: Blog = JSON.parse(content)
  const readingTime = calculateReadingTime(blog.content)

  return (
    <div className={styles.container}>
      <Link href="/blog" className={styles.backLink}>
        ← Back to Blogs
      </Link>
      
      <article className={styles.article}>
        <h1 className={styles.title}>
          {blog.title}
        </h1>
        
        <div className={styles.metadata}>
          <div className={styles.authorInfo}>
            <span className={styles.authorLabel}>By</span>
            <strong className={styles.authorName}>{blog.author}</strong>
          </div>
          <div className={styles.metaDivider}>•</div>
          <div className={styles.readingTime}>
            <span className={styles.readingIcon}>⏱️</span>
            <span>{readingTime} min read</span>
          </div>
        </div>
        
        <div 
          dangerouslySetInnerHTML={{ __html: blog.content }}
          className={styles.content}
        />
      </article>
    </div>
  )
}

export async function generateStaticParams() {
  const dirPath = path.join(process.cwd(), 'blogdata')
  const files = fs.readdirSync(dirPath)
  
  return files.map(file => ({
    slug: file.replace('.json', '')
  }))
}