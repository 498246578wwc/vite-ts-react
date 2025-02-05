import { Menu, RouteItem } from '@/store/user.ts'

export * from './common.ts'

/**
 * 把后台传来的menus转换成路由
 * 步骤：1、通过parentId先分组，2、递归生成路由
 * @param menus
 * @returns
 */
export function menusToRoutes(menus: Menu[]): RouteItem[] {
  const routes: RouteItem[] = []
  const prefixPath = '@/pages'
  const routerMenus = menus.filter((item) => {
    return item.enabled && item.type === 'menu' && item.handleType === 'route'
  })

  const groupedMenus = routerMenus.reduce(
    (acc, menu) => {
      if (!acc[menu.parentId]) {
        acc[menu.parentId] = []
      }
      acc[menu.parentId].push(menu)
      return acc
    },
    {} as Record<number, Menu[]>,
  )

  for (const parentId in groupedMenus) {
    const group = groupedMenus[parentId]
    const route: RouteItem = {
      path: `/${group[0].path}`,
      component: `${prefixPath}${group[0].component}`,
      children: group.map((menu) => ({
        path: `/${menu.path}`,
        component: `${prefixPath}${menu.component}`,
      })),
    }
    routes.push(route)
  }
  return routes
}
