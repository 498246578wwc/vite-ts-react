import { lazy } from 'react'

import { buildRoutes, RouteConfig } from './utils'

const routeConfig: RouteConfig[] = [
  {
    element: lazy(() => import('@/layouts/BasicLayout')),
    middlewares: [
      lazy(() => import('@/middlewares/AuthMiddleware')),
      // lazy(() => import('@/middlewares/AdminMiddleware')),
    ],
    children: [
      {
        path: '/',
        index: true,
        element: lazy(() => import('@/pages/Home')),
      },
      {
        path: '/*',
        element: lazy(() => import('@/components/NotFound')),
      },
    ],
  },
  {
    element: lazy(() => import('@/layouts/LoginLayout')),
    children: [
      {
        path: '/login',
        element: lazy(() => import('@/pages/Login')),
      },
    ],
  },
  {
    path: '/loginTest',
    element: lazy(() => import('@/pages/LoginTest')),
  },
  {
    path: '/*',
    element: lazy(() => import('@/components/NotFound')),
  },
]

export const routes = buildRoutes(routeConfig)
