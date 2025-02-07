import StatisticGroup from '@/pages/Home/components/StatisticGroup.tsx'
import { Card, Col, Row } from 'antd'
import DemoPie from '@/pages/Charts/DemoPie'

const HomePage = () => {
  return (
    <div className="max-w-screen mx-auto px-4"> {/* 添加容器约束 */}
      <StatisticGroup />
      <Row
        gutter={[16, 16]}
        className="w-full mt-4"
      >
        {[1, 2, 3, 4].map((item) => (
          <Col
            key={item}
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={6}
            xxl={6}
            className="flex" /* 添加flex布局 */
          >
            <Card
              className="w-full h-[300px] sm:h-[320px] lg:h-[340px] shadow-sm"
              bodyStyle={{
                padding: 12,
                height: '100%',
                display: 'flex' // 修复图表布局
              }}
            >
              <DemoPie />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}
export default memo(HomePage)
