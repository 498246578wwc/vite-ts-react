import './index.css'

import { App } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

import ThemeSwitcher from '@/components/ThemeSwitcher'
import { routes } from '@/router/routes.tsx'

const AppRoute = () => {
  return <RouterProvider router={createBrowserRouter(routes)} />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeSwitcher>
      <App>
        <AppRoute />
      </App>
    </ThemeSwitcher>
  </React.StrictMode>,
)
