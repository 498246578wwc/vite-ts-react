import { BreadcrumbProps } from 'antd'
import { Link, useLocation } from 'react-router-dom'

type BreadcrumbItem = Exclude<BreadcrumbProps['items'], undefined>[number]

export const useDynamicBreadcrumbs = () => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter(Boolean)

  const items: BreadcrumbItem[] = pathnames.map((path, index) => {
    const url = `/${pathnames.slice(0, index + 1).join('/')}`
    return {
      title: index === pathnames.length - 1 ? (
        <span className="text-gray-600 dark:text-gray-300 capitalize">{path}</span>
      ) : (
        <Link to={url} className="text-blue-600 dark:text-blue-400 hover:underline">
          {/* @ts-ignore */}
          {path.replace(/-/g, ' ').capitalize()}
        </Link>
      )
    }
  })

  // 添加首页
  items.unshift({
    title: <Link to="/" className="text-blue-600 dark:text-blue-400">Home</Link>
  })

  return items
}