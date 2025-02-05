import { App, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router'

import { useAuthStore } from '@/store/auth.ts'

const AuthMiddleware = () => {
  const [loading, setLoading] = useState(true)
  const isAuth = useAuthStore((state) => state.isAuth)
  const navigate = useNavigate()
  const { notification } = App.useApp()
  useEffect(() => {
    if (isAuth) {
      setLoading(false)
    } else {
      // 未登录，跳转到登录页
      navigate('/login')
      notification.error({
        message: '消息提示',
        description: '未登录，跳转到登录页',
      })
    }
  }, [isAuth])
  return !loading ? <Outlet /> : <Spin delay={500} spinning fullscreen />
}

export default AuthMiddleware
