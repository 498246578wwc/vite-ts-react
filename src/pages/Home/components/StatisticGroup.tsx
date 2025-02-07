import { Card, Col, Row, Statistic, StatisticProps } from 'antd'
import CountUp from 'react-countup'

const formatter: StatisticProps['formatter'] = (value) => <CountUp end={value as number} separator="," />

const StatisticGroup = () => {
  return (
    <Card bodyStyle={{ padding: 16 }}> {/* 统一内边距 */}
      <Row gutter={[16, 16]} className="w-full"> {/* 使用相同gutter */}
        {[
          { title: '总客户', value: 34555, bg: 'bg-gradient-to-r from-cyan-600 to-blue-900' },
          { title: '总销量', value: 65433, bg: 'bg-gradient-to-r from-purple-700 to-pink-600' },
          { title: '总利润', value: 775664, prefix: '￥', bg: 'bg-gradient-to-r from-sky-800 to-indigo-400' },
          { title: '订单数', value: 75543, bg: 'bg-gradient-to-r from-violet-900 to-fuchsia-500' }
        ].map((item, index) => (
          <Col
            key={index}
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={6}
            className="flex" /* 保持布局一致 */
          >
            <div className={`${item.bg} p-6 rounded-lg w-full flex-1`}> {/* 统一元素高度 */}
              <Statistic
                title={<span className="text-white text-sm md:text-base">{item.title}</span>}
                value={item.value}
                precision={2}
                valueStyle={{
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1.25rem' // 统一字体大小
                }}
                formatter={formatter}
                prefix={item.prefix}
                className="whitespace-nowrap" // 防止文字换行
              />
            </div>
          </Col>
        ))}
      </Row>
    </Card>
  )
}
export default memo(StatisticGroup)
