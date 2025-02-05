import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ThemeState = {
  theme: 'light' | 'dark' | 'system'
  systemTheme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  toggleTheme: () => void
  setSystemTheme: (theme: 'light' | 'dark') => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      systemTheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',

      setTheme: (theme) => {
        set({ theme })
        // 立即应用主题变化
        applyThemeToDOM(theme === 'system' ? get().systemTheme : theme)
      },

      toggleTheme: () => {
        const current = get().theme === 'system' ? get().systemTheme : get().theme
        const newTheme = current === 'light' ? 'dark' : 'light'
        set({ theme: newTheme, systemTheme: newTheme })
        applyThemeToDOM(newTheme)
      },

      setSystemTheme: (systemTheme) => {
        set({ systemTheme })
        // 当使用系统主题时自动更新
        if (get().theme === 'system') {
          applyThemeToDOM(systemTheme)
        }
      },
    }),
    {
      name: 'theme-store',
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
)

// 应用主题到 DOM（同时处理 Tailwind 和 Ant Design）
export const applyThemeToDOM = (theme: 'light' | 'dark' | 'system') => {
  // 切换 Tailwind 暗色模式类
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
