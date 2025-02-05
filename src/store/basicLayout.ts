import { create } from 'zustand/index'
import { devtools } from 'zustand/middleware'

interface BasicLayoutState {
  collapsed?: boolean
  userToggled: boolean // 新增用户操作标记
  screenWidth: number
  toggleCollapsed: (collapsed: boolean) => void
}

const useBasicLayoutStore = create<BasicLayoutState>()(
  devtools(
    (set) => ({
      collapsed: false,
      userToggled: false, // 新增用户操作标记
      toggleCollapsed: (collapsed: boolean) => set({ collapsed, userToggled: true }),
    }),
    {
      name: 'basicLayoutStore', // DevTools 中显示的名称
      enabled: process.env.NODE_ENV === 'development', // 仅开发环境启用
    },
  ),
)
export default useBasicLayoutStore
