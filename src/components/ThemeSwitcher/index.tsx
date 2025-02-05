// ThemeSwitcher.tsx
import React, { useEffect, useMemo } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';

// 类型定义
type AntdThemeConfig = React.ComponentProps<typeof ConfigProvider>['theme'];

// 主题配置工厂函数
const createThemeConfig = (isDark: boolean): AntdThemeConfig => ({
  algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
  token: {
    colorPrimary: '#4f39f6',
    colorInfo: '#004cffeb',
    wireframe: false,
    colorBgContainer: isDark ? '#101828' : '#ffffff',
  },
  components: {
    Button: {
      colorPrimary: '#4f39f6', // 组件级主题覆盖示例
    },
  },
});

// 动态过渡样式（优化版）
const useSmoothTransition = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --theme-transition: background-color 0.3s ease, color 0.2s ease, border-color 0.2s ease;
      }
      body, .ant-* {
        transition: var(--theme-transition) !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);
};

const ThemeSwitcher: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme: storedTheme, systemTheme, setSystemTheme } = useThemeStore();
  const currentTheme = storedTheme === 'system' ? systemTheme : storedTheme;

  // 应用 CSS 过渡效果
  useSmoothTransition();

  // 生成主题配置
  const themeConfig = useMemo(
    () => createThemeConfig(currentTheme === 'dark'),
    [currentTheme]
  );

  // 系统主题监听（优化内存管理）
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [setSystemTheme]);

  // 同步 Tailwind 暗黑模式
  useEffect(() => {
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');
  }, [currentTheme]);

  return (
    <ConfigProvider
      componentSize="large"
      theme={themeConfig}
      // 统一设置组件类名前缀（可选）
      prefixCls="my-app"
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeSwitcher;