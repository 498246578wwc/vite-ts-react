import { MoonFilled } from '@ant-design/icons'
import { Button } from 'antd'
import { animated } from 'react-spring'

interface HeaderProps {
  [key: string]: object
}

const Header: React.FC<HeaderProps> = (props) => {
  const toggleTheme = useThemeStore((state) => state.toggleTheme)
  return (
    <animated.header {...props}>
      <div className="flex justify-end items-center">
        <animated.div className="flex items-center space-x-4">
          <Button type="text" shape="circle" icon={<MoonFilled />} onClick={toggleTheme} />
        </animated.div>
      </div>
    </animated.header>
  )
}
export default memo(Header)
