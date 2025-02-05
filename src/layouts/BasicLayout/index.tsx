import { Breadcrumb, Menu, MenuProps } from 'antd'
import { motion } from 'framer-motion'
import { Outlet } from 'react-router'

import getAntdIcon from '@/components/AntdIcon'
import LayoutHeader from '@/layouts/BasicLayout/components/LayoutHeader'
import { buildMenuTree } from '@/store/auth.ts'
import useBasicLayoutStore from '@/store/basicLayout.ts'
import { useThemeStore } from '@/store/theme.ts'

// 定义跳动动画的变体
const bounceVariants = {
  initial: {
    y: 0,
  },
  animate: {
    y: [-10, 0],
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}

const BasicLayout = () => {
  const theme = useThemeStore((state) => state.systemTheme)
  const navigate = useNavigate()
  const collapsed = useBasicLayoutStore((state) => state.collapsed)
  const toggleCollapsed = useBasicLayoutStore((state) => state.toggleCollapsed)
  const location = useLocation() // 获取当前的路由位置
  // 监听页面宽度，当宽度缩小时 菜单栏收起
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        toggleCollapsed(false) // 窗口宽度小于 768px 时收起菜单栏
      } else {
        toggleCollapsed(true) // 窗口宽度大于等于 768px 时展开菜单栏
      }
    }

    // 初次加载时设置菜单状态
    handleResize()

    // 添加resize事件监听
    window.addEventListener('resize', handleResize)

    // 清除事件监听
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  type MenuItem = Required<MenuProps>['items'][number]

  const menus = useAuthStore((state) => state.menus)
  const [items, setItems] = useState<MenuItem[]>([])

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

  useEffect(() => {
    setItems(processedItems)
  }, [processedItems])

  /**
   * 点击菜单跳转
   * @param e
   */
  const onClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key)
  }
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* 侧边栏 */}
      <motion.div
        className={`shadow-lg flex flex-col ${collapsed ? 'w-64' : 'w-20'} bg-white dark:bg-gray-900`}
        initial={{ width: 256 }}
        animate={{ width: collapsed ? 256 : 80 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="p-4">
          <strong className="text-2xl text-gray-800 dark:text-gray-100">Logo</strong>
        </div>

        <div className="flex-1 overflow-auto no-scrollbar ">
          <Menu
            items={items}
            inlineCollapsed={!collapsed}
            className={'custom-menu'}
            theme={theme}
            onClick={onClick}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode={collapsed ? 'inline' : 'vertical'}
          />
        </div>
      </motion.div>

      {/* 主内容区 */}
      <motion.div
        className="flex-1 overflow-auto no-scrollbar bg-gray-100 dark:bg-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <LayoutHeader />

        <div className="p-4">
          <div className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100">
            <Breadcrumb
              items={[
                {
                  title: 'Home',
                },
                {
                  title: <a href="">Application Center</a>,
                },
                {
                  title: <a href="">Application List</a>,
                },
                {
                  title: 'An Application',
                },
              ]}
            />
          </div>

          <motion.div
            className="grid gap-1 md:grid-cols-1 lg:grid-cols-1"
            variants={bounceVariants}
            initial="initial"
            animate="animate"
            key={location.pathname} // 路由变化时会触发动画
          >
            <Outlet />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default BasicLayout
