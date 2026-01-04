import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const dirPath = path.join(process.cwd(), 'blogdata')
    const files = fs.readdirSync(dirPath)
    
    const blogs = files.map(file => {
      const filePath = path.join(dirPath, file)
      const content = fs.readFileSync(filePath, 'utf-8')
      return JSON.parse(content)
    })

    return NextResponse.json(blogs)
  } catch (error) {
    console.error('Error reading blog files:', error)
    return NextResponse.json(
      { error: 'Failed to load blogs' },
      { status: 500 }
    )
  }
}


