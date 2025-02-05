import { Line } from '@ant-design/charts'
import { Card } from 'antd'
import { FC } from 'react'

const config = {
  animate: { enter: { type: 'waveIn' } },
  xField: 'year',
  yField: 'value',
  point: {
    shapeField: 'square',
    sizeField: 4,
  },
  interaction: {
    tooltip: {
      marker: false,
    },
  },
  style: {
    lineWidth: 2,
  },
}

const DemoLine: FC = () => {
  const [data, setData] = useState([
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ])
  useEffect(() => {
    setData(data.map((d) => ({ ...d, value: Math.floor(Math.random() * 100) })))
  }, [])
  return (
    <Card title={'基础折线图'}>
      <Line className={'w-84'} {...config} data={data} />
    </Card>
  )
}
export default memo(DemoLine)
