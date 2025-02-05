import { animated, useSpring } from 'react-spring'
import useBasicLayoutStore from '@/store/basicLayout.ts'
import { Menu, MenuProps } from 'antd'
import getAntdIcon from '@/components/AntdIcon'
import { buildMenuTree } from '@/store/auth.ts'
import { useThemeStore } from '@/store/theme.ts'

type MenuItem = Required<MenuProps>['items'][number]



const Sidebar = () => {
  const collapsed = useBasicLayoutStore((state) => state.collapsed)
  const menus = useAuthStore((state) => state.menus)
  const theme = useThemeStore((state) => state.systemTheme)
  const navigate = useNavigate()
  const location = useLocation() // 获取当前的路由位置

  // 使用 useSpring 来实现侧边栏动画
  const sidebarSpring = useSpring({
    width: collapsed ? 90 : 230,
    config: {
      tension: 300,
      precision: 0.01, // 提升动画精度
    },
    immediate: window.innerWidth === 0, // 防止SSR问题
  })

  const processMenus = useCallback((menus: any[]): MenuItem[] => {
    // 合并过滤和转换逻辑
    const transformMenu = (menu: { path: any; title: any; children: any; icon: any }): MenuItem => {
      const { path, title, children, icon } = menu

      const menuItem: MenuItem = {
        label: title,
        key: path,
        icon: getAntdIcon(icon),
      }

      if (children?.length) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        menuItem.children = children.map(transformMenu)
      }

      return menuItem
    }

    return buildMenuTree(menus.filter((menu) => menu.type !== 'btn')).map(transformMenu)
  }, [])

  // 使用 useMemo 优化计算
  const processedItems = useMemo(() => processMenus(menus), [menus, processMenus])

  /**
   * 点击菜单跳转
   * @param e
   */
  const onClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key)
  }

  return (
    <animated.div
      className="shadow-lg flex flex-col bg-white dark:bg-gray-900"
      style={{
        ...sidebarSpring,
        overflow: 'hidden', // 防止内容溢出
        flexShrink: 0, // 防止Flex布局挤压
        minWidth: 80, // 防止过度收缩
        willChange: 'width', // 性能优化
      }}
    >
      <div className="p-4">
        <strong className="text-2xl text-gray-800 dark:text-gray-100">Logo</strong>
      </div>

      <div className="flex-1 overflow-auto no-scrollbar ">
        <Menu
          items={processedItems}
          className={'custom-menu'}
          theme={theme}
          onClick={onClick}
          selectedKeys={[location.pathname]}
          mode="inline"
          inlineCollapsed={collapsed}
        />
      </div>
    </animated.div>
  )
}
export default memo(Sidebar)
