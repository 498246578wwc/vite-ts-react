import { create } from 'zustand/index'
import { devtools } from 'zustand/middleware'

interface BasicLayoutState {
  collapsed?: boolean
  toggleCollapsed: (collapsed: boolean) => void
}

const useBasicLayoutStore = create<BasicLayoutState>()(
  devtools(
    (set) => ({
      collapsed: false,
      toggleCollapsed: (collapsed) => set(() => ({ collapsed })),
    }),
    {
      name: 'basicLayoutStore', // DevTools 中显示的名称
      enabled: process.env.NODE_ENV === 'development', // 仅开发环境启用
    },
  ),
)
export default useBasicLayoutStore
