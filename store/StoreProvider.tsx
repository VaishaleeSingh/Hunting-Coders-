'use client'

import { useRef, useEffect } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from './store'
import { setTheme } from './themeSlice'

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore | undefined>(undefined)
  if (!storeRef.current) {
    storeRef.current = makeStore()
    // Initialize theme immediately on store creation
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      const initialTheme = savedTheme || systemTheme
      document.documentElement.setAttribute('data-theme', initialTheme)
    }
  }

  useEffect(() => {
    // Sync store state with DOM
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      const initialTheme = savedTheme || systemTheme
      
      storeRef.current?.dispatch(setTheme(initialTheme))
    }
  }, [])

  return <Provider store={storeRef.current}>{children}</Provider>
}

