import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';

const DemoPie: React.FC = () => {
  const option = {
    title : {
      text: '饼状图',
      x:'center'
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      bottom: "30%",
      orient: "horizontal",
      data: ['唱','跳','rep','篮球']
    },
    series : [
      {
        name: '小黑子',
        type: 'pie',
        radius : '55%',
        center: ['53%', '33%'],
        data:[
          {value:335, name:'唱'},
          {value:310, name:'跳'},
          {value:234, name:'rep'},
          {value:135, name:'篮球'},
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  const [count, setCount] = useState(0);

  function onChartReady(echarts: any) {
    console.log('echarts is ready', echarts)
  }

  function onChartClick(param: any, echarts: any) {
    console.log(param, echarts)
    setCount(count + 1)
  };

  function onChartLegendselectchanged(param: any, echarts: any) {
    console.log(param, echarts)
  };

  return (
    <div className={'w-full h-full min-h-[200px]'}>
      <ReactECharts
        className="w-full h-full flex-1"
        option={option}
        style={{ height: 400 }}
        onChartReady={onChartReady}
        onEvents={{
          'click': onChartClick,
          'legendselectchanged': onChartLegendselectchanged
        }}
      />
    </div>
  );
};

export default DemoPie;