import { Card, Col, Row, Statistic, StatisticProps } from 'antd'
import CountUp from 'react-countup'

const formatter: StatisticProps['formatter'] = (value) => <CountUp end={value as number} separator="," />

const StatisticGroup = () => {
  return (
    <Card>
      <Row className="justify-around">
        <Col
          className="m-2"
          xs={{ flex: '100%' }}
          sm={{ flex: '100%' }}
          md={{ flex: '46%' }}
          lg={{ flex: '46%' }}
          xl={{ flex: '23%' }}
        >
          <div className="p-8 rounded-lg bg-linear-to-r from-cyan-600 to-blue-900">
            <Statistic
              title={<span className="text-white">总客户</span>}
              value={34555}
              precision={2}
              valueStyle={{ color: '#fff', fontWeight: '700' }}
              formatter={formatter}
            />
          </div>
        </Col>
        <Col
          className="m-2"
          xs={{ flex: '100%' }}
          sm={{ flex: '100%' }}
          md={{ flex: '46%' }}
          lg={{ flex: '46%' }}
          xl={{ flex: '23%' }}
        >
          <div className="p-8 rounded-lg bg-linear-210 from-purple-700 to-pink-600">
            <Statistic
              title={<span className="text-white">总销量</span>}
              value={65433}
              precision={2}
              valueStyle={{ color: '#fff', fontWeight: '700' }}
              formatter={formatter}
            />
          </div>
        </Col>
        <Col
          className="m-2"
          xs={{ flex: '100%' }}
          sm={{ flex: '100%' }}
          md={{ flex: '46%' }}
          lg={{ flex: '46%' }}
          xl={{ flex: '23%' }}
        >
          <div className="p-8 rounded-lg bg-linear-to-t from-sky-800 to-indigo-400">
            <Statistic
              title={<span className="text-white">总利润</span>}
              value={775664}
              precision={2}
              valueStyle={{ color: '#fff', fontWeight: '700' }}
              formatter={formatter}
              prefix={'￥'}
            />
          </div>
        </Col>
        <Col
          className="m-2"
          xs={{ flex: '100%' }}
          sm={{ flex: '100%' }}
          md={{ flex: '46%' }}
          lg={{ flex: '46%' }}
          xl={{ flex: '23%' }}
        >
          <div className="p-8 rounded-lg bg-linear-to-bl from-violet-900 to-fuchsia-500">
            <Statistic
              title={<span className="text-white">订单数</span>}
              value={75543}
              precision={2}
              valueStyle={{ color: '#fff', fontWeight: '700' }}
              formatter={formatter}
            />
          </div>
        </Col>
      </Row>
    </Card>
  )
}
export default memo(StatisticGroup)
