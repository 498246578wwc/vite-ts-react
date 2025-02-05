import { Outlet } from 'react-router'
import { animated, useSpring } from 'react-spring'

import Header from '@/components/Header'

const LoginLayout = () => {
  // 使用 useSpring 来实现头部动画
  const headerSpring = useSpring({
    x: 0,
    from: { x: -100 },
    config: { mass: 1, tension: 120, friction: 20, duration: 500 },
  })

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <animated.div style={headerSpring} className="hidden bg-cover lg:block lg:w-2/3">
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40 dark:bg-zinc-700">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">行动胜于空谈</h2>

              <p className="max-w-xl mt-3 text-gray-300">行动是治愈恐惧的良药，而犹豫、拖延将不断滋养恐惧。</p>
            </div>
          </div>
        </animated.div>
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <Header />
            <div className="mt-8">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginLayout
