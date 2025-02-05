import { Divider } from 'antd'
import { animated } from 'react-spring'

import LoginForm from '@/pages/Login/components/LoginForm.tsx'

const LoginPage = () => {
  return (
    <animated.main className="flex-grow">
      <animated.div>
        <p className="text-center text-2xl font-extrabold text-gray-900 dark:text-white">等风来 不如追风去</p>
        <Divider />
      </animated.div>
      <LoginForm />
    </animated.main>
  )
}
export default memo(LoginPage)
