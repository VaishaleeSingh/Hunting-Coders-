export function calculateReadingTime(content: string): number {
  // Remove HTML tags
  const text = content.replace(/<[^>]*>/g, '')
  // Count words (split by whitespace)
  const words = text.trim().split(/\s+/).length
  // Average reading speed: 200 words per minute
  const readingTime = Math.ceil(words / 200)
  return readingTime || 1 // Minimum 1 minute
}


