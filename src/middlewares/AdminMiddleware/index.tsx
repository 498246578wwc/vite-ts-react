import { Spin } from 'antd'
import { useState } from 'react'
import { Outlet } from 'react-router'

const AdminMiddleware = () => {
  const [loading] = useState(true)
  return !loading ? <Outlet /> : <Spin delay={500} spinning fullscreen />
}

export default AdminMiddleware
