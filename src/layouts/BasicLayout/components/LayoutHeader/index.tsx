import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Dropdown, MenuProps, message } from 'antd'

import Header from '@/components/Header'
import useBasicLayoutStore from '@/store/basicLayout.ts'

const items: MenuProps['items'] = [
  {
    key: '1',
    label: <span>切换角色</span>,
  },
  {
    key: '2',
    label: <span>个人中心</span>,
  },
  {
    key: '3',
    label: <span>退出登录</span>,
  },
]

const LayoutHeader = () => {
  const toggleCollapsed = useBasicLayoutStore((state) => state.toggleCollapsed)

  const collapsed = useBasicLayoutStore((state) => state.collapsed)

  const navigate = useNavigate()
  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case '1':
        message.info('切换角色')
        break
      case '2':
        message.info('个人中心')
        break
      default:
        navigate('/login')
        break
    }
  }
  return (
    <nav className="bg-white shadow dark:bg-gray-900">
      <div className="container flex items-center p-4 mx-auto text-gray-600 capitalize dark:text-gray-300">
        <Button
          type="text"
          className="mr-4"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => toggleCollapsed(!collapsed)}
        />
        {/* 右侧内容容器 */}
        <div className="flex items-center ml-auto">
          <Header />
          <Dropdown menu={{ items, onClick }} placement="bottom">
            <div className="flex items-center gap-x-2 ml-6">
              <img
                className="object-cover w-8 h-8 rounded-full"
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100"
                alt="User avatar"
              />
              <div>
                <h1 className="text-base font-semibold text-gray-700 capitalize dark:text-white">Mia John</h1>
              </div>
            </div>
          </Dropdown>
        </div>
      </div>
    </nav>
  )
}

export default LayoutHeader
