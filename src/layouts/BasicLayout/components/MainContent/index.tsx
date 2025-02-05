import LayoutHeader from '@/layouts/BasicLayout/components/LayoutHeader'
import { Breadcrumb } from 'antd'
import { animated, useSpring } from 'react-spring'
import { Outlet } from 'react-router'
import { useDynamicBreadcrumbs } from '@/layouts/BasicLayout/components/Breadcrumb'

const MainContent = () => {

  const breadcrumbItems = useDynamicBreadcrumbs()

  // 使用 useSpring 来实现主内容区动画
  const contentSpring = useSpring({
    marginLeft: 0,
  })
  return(
    <animated.div
      className="flex-1 overflow-auto no-scrollbar bg-gray-100 dark:bg-gray-700"
    >
      <LayoutHeader />

      <div className="p-4">
        <div className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100">
          <div className="mb-4">
            <Breadcrumb
              items={breadcrumbItems}
              className="text-lg font-medium"
              itemRender={(item) => item.title}
            />
          </div>
        </div>
        <animated.div
          className="grid gap-1"
          style={contentSpring}
          key={location.pathname} // 路由变化时会触发动画
        >
          <Outlet />
        </animated.div>
      </div>
    </animated.div>
  )
}
export default memo(MainContent)