import { Spin } from 'antd'

const LazyLoading = () => {
  return (
    <div>
      <Spin delay={500} spinning fullscreen />
    </div>
  )
}

export default LazyLoading
