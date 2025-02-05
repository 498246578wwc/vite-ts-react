import { OrbitControls, Stars } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { animated, useSpring } from 'react-spring'
import * as THREE from 'three'

// 3D立方体组件
function RotatingCube() {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#6366f1" metalness={0.8} roughness={0.3} transparent opacity={0.8} />
    </mesh>
  )
}

// 登录表单组件
const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const animationProps = useSpring({
    opacity: 1,
    y: 0,
    from: { opacity: 0, y: 50 },
    config: { duration: 1000 }, // 配置动画持续时间
  })
  return (
    <animated.div
      style={animationProps}
      className="relative z-10 bg-gradient-to-br from-purple-500/20 to-indigo-600/20 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/10 w-96"
    >
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        Welcome Back
      </h1>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-cyan-200">Email</label>
          <animated.input
            // whileFocus={{ scale: 1.05 }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full bg-black/30 rounded-lg px-4 py-3 border border-white/10 focus:ring-2 focus:ring-cyan-300 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-cyan-200">Password</label>
          <animated.input
            // whileFocus={{ scale: 1.05 }}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full bg-black/30 rounded-lg px-4 py-3 border border-white/10 focus:ring-2 focus:ring-cyan-300 focus:border-transparent"
          />
        </div>

        <animated.button
          // whileHover={{ scale: 1.05 }}
          // whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
          type="submit"
        >
          Sign In
        </animated.button>
      </form>

      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />
    </animated.div>
  )
}

// 主页面
export default function LoginPage() {
  return (
    <div className="h-screen w-full relative bg-gray-900 overflow-hidden">
      {/* 3D场景 */}
      <Canvas className="absolute top-0 left-0">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        <RotatingCube />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>

      {/* 登录表单 */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <LoginForm />
      </div>

      {/* 背景光效 */}
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen blur-3xl -translate-x-1/2 -translate-y-1/3" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-screen blur-3xl translate-x-1/3 translate-y-1/3" />
    </div>
  )
}
