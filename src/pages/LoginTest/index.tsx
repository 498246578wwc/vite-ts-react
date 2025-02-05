import { animated, useSpring } from '@react-spring/web'
import { Canvas, useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import { BoxGeometry, MeshStandardMaterial } from 'three'

// 登录表单组件
const LoginForm: React.FC = () => {
  const { rotateY } = useSpring({
    rotateY: 360,
    loop: true,
    config: { duration: 3000 },
  })

  return (
    <animated.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 bg-white bg-opacity-20 backdrop-blur-md rounded-md shadow-md"
      style={{ transform: rotateY.interpolate((deg) => `rotateY(${deg}deg)`) }}
    >
      <h2 className="text-2xl font-bold text-white mb-4">Login</h2>
      <input type="text" placeholder="Username" className="w-full p-2 mb-4 rounded-md border border-gray-300" />
      <input type="password" placeholder="Password" className="w-full p-2 mb-4 rounded-md border border-gray-300" />
      <button className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Login</button>
    </animated.div>
  )
}

// 旋转立方体组件
const RotatingCube = () => {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01
      mesh.current.rotation.y += 0.01
    }
  })

  return (
    <mesh ref={mesh} position={[0, 0, -5]}>
      <BoxGeometry args={[2, 2, 2]} />
      <MeshStandardMaterial color="blue" />
    </mesh>
  )
}

// 主应用组件
const App: React.FC = () => {
  return (
    <div className="h-screen bg-gradient-to-r from-purple-500 to-pink-500 relative overflow-hidden">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <RotatingCube />
      </Canvas>
      <LoginForm />
    </div>
  )
}

export default App
