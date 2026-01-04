import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Theme = 'light' | 'dark'

interface ThemeState {
  theme: Theme
}

const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme)
      return savedTheme
    }
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', systemTheme)
    return systemTheme
  }
  return 'light'
}

const initialState: ThemeState = {
  theme: getInitialTheme(),
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.theme)
        document.documentElement.setAttribute('data-theme', state.theme)
      }
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.theme)
        document.documentElement.setAttribute('data-theme', state.theme)
      }
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer

