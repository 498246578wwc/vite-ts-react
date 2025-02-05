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
    <div className="bg-white shadow dark:bg-gray-900">
      <div className="flex items-center justify-between p-4 w-full text-gray-600 capitalize dark:text-gray-300">
        {/* 左侧菜单按钮 */}
        <div className="flex items-center flex-shrink-0">
          <Button
            type="text"
            className="mr-4"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => toggleCollapsed(!collapsed)}
          />
        </div>
        {/* 右侧header容器 */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* 自动撑满的中间区域 */}
          <div className="flex-1 min-w-0 flex justify-end">
            <Header /> {/* 假设 Header 需要靠右显示 */}
          </div>
          <Dropdown menu={{ items, onClick }} placement="bottom">
            <div className="flex items-center gap-x-2 cursor-pointer flex-shrink-0">
              <img
                className="w-8 h-8 rounded-full object-cover"
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100"
                alt="User avatar"
              />
              <span className="font-semibold text-gray-700 dark:text-white">
                Mia John
              </span>
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default LayoutHeader
