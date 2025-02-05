import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { sendLogin } from '@/api/login.ts'

// 定义用户信息的类型
export interface User {
  [key: string]: object
}

// 定义角色信息的类型
export interface Role {
  [key: string]: object
}

// 定义菜单信息的类型
export interface Menu {
  id: number
  roleId: number
  parentId: number
  title: string
  name: string
  path: string
  component: string
  icon: string
  platform: string
  type: string
  handleType: string
  outerUrl: string
  order: number
  enabled: boolean
  cache: boolean
  children: Menu[]
}

interface AuthState {
  token: string | null
  user: User | null // 用户信息
  roles: Role[] // 角色信息
  menus: Menu[] // 菜单信息
  routes: Menu[]
  isAuth: boolean
  login: (loginForm: Record<string, string>) => Promise<void> // 登录
  logout: () => void // 注销
  setUser: (user: User | null) => void // 设置用户信息
  setRoles: (roles: Role[]) => void // 设置角色信息
  setMenus: (menus: Menu[]) => void // 设置菜单信息
  formatRoutes: (routes: Menu[]) => void // 格式化菜单
}
const initAuth = {
  token: null,
  user: null,
  roles: [],
  menus: [],
  routes: [],
  isAuth: false,
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initAuth,

        login: async (loginForm) => {
          const { httpCode, status, message, data } = await sendLogin(loginForm)
          if (httpCode === 200 && status === 'success') {
            const { tokenValue, user, roles, menus } = data
            set({
              token: tokenValue,
              isAuth: true,
              user,
              roles,
              menus,
            })
            get().formatRoutes(menus)
          } else {
            throw new Error(message)
          }
        },

        logout: () => {
          set({ ...initAuth })
        },
        // 设置用户信息
        setUser: (user) => set({ user }),

        // 设置角色信息
        setRoles: (roles) => set({ roles }),

        // 设置菜单信息
        setMenus: (menus) => set({ menus }),

        // 格式化菜单
        formatRoutes: (menus) => {
          set({
            routes: buildMenuTree(menus),
          })
        },
      }),
      {
        name: 'auth-storage', // 本地存储的 key
      },
    ),
    {
      name: 'AuthStore', // DevTools 中显示的名称
      enabled: process.env.NODE_ENV === 'development', // 仅开发环境启用
    },
  ),
)

// 格式化菜单
export function buildMenuTree(menus: Menu[]) {
  const tree: Menu[] = [] // 最终的树形结构
  const map: Record<number, Menu> = {} // 存储所有节点的引用

  // 第一步：创建所有节点的映射，并初始化children
  menus.forEach((menu) => {
    map[menu.id] = {
      ...menu,
      children: [],
    }
  })
  // 第二步：构建树结构
  menus.forEach((menu) => {
    const node = map[menu.id]

    // 处理根节点（dir类型）
    if (menu.parentId === 0 || menu.parentId === null) {
      tree.push(node)
    }
    // 处理子节点（menu/btn类型）
    else {
      const parent = map[menu.parentId ?? 0]
      if (parent) {
        parent.children.push(node)
      } else {
        // 无效的parentId处理
        console.info(`Orphan node detected: ${menu.id}`)
      }
    }
  })

  return tree
}
