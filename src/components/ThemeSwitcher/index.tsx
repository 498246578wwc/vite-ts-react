// ThemeSwitcher.tsx
import { ConfigProvider } from 'antd'
import { theme } from 'antd'
import React, { useEffect } from 'react'

// Ant Design 主题配置
const lightTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#4f39f6',
    colorBgContainer: '#ffffff', // 与 Tailwind 背景色保持一致
  },
}

const darkTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#4f39f6',
    colorBgContainer: '#101828', // 与 Tailwind 暗色背景一致
  },
}

const ThemeSwitcher: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { theme, systemTheme } = useThemeStore()
  const currentTheme = theme === 'system' ? systemTheme : theme

  // 动态 CSS 过渡效果
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      * {
        transition: background-color 0.1s ease, color 0.1s ease, border-color 0.1s ease !important;
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  useEffect(() => {
    // 初始化系统主题监听
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', (e) => {
      useThemeStore.getState().setSystemTheme(e.matches ? 'dark' : 'light')
    })

    // 首次加载时应用主题
    return applyThemeToDOM(
      useThemeStore.getState().theme === 'system'
        ? useThemeStore.getState().systemTheme
        : useThemeStore.getState().theme,
    )
  }, [])

  return (
    <ConfigProvider componentSize={'large'} theme={currentTheme === 'dark' ? darkTheme : lightTheme}>
      {/* 同时应用 Tailwind 主题类 */}
      <div className={currentTheme === 'dark' ? 'dark' : ''}>{children}</div>
    </ConfigProvider>
  )
}

export default ThemeSwitcher
