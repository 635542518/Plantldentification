// @ts-nocheck
import { Column } from '@ant-design/plots';
import './pieplot.scss'
import React, { useContext } from 'react';
import {MyContext} from '../../App';
import { Pie, measureTextWidth } from '@ant-design/plots';

const DemoPie = () => {
  const {identifyData,setIdentifyData} = useContext(MyContext)!;
  const data = identifyData
  function renderStatistic(containerWidth, text, style) {
    return `<div style=font-size:10px>
            ${text}
            </div>`
  }

  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'name',
    radius: 1,
    innerRadius: 0.64,
    meta: {
      value: {
        formatter: (v) => `${v} ¥`,
      },
    },
    label: {
      type: 'inner',
      offset: '-50%',
      style: {
        textAlign: 'center',
      },
      autoRotate: false,
      content: ({ percent }) => `${percent*100<1?'':(percent*100).toFixed(1)+'%'}`,
    },
    statistic: {
      title: {
        offsetY: -4,
        customHtml: (container, view, datum) => {
          
          if (datum==undefined){return '<div></div>'}
          const { width, height } = container.getBoundingClientRect();
          const d = datum['value'].toFixed(2)
          const text =  datum['name']
          return renderStatistic(d, text, {
            fontSize: 100,
          });
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: '32px',
        },
        customHtml: (container, view, datum, data) => {
          const { width } = container.getBoundingClientRect();
          const text = datum ? `¥ ${datum.value}` : `¥ ${data.reduce((r, d) => r + d.value, 0)}`;
          return renderStatistic(10, '健康情况', {
            fontSize: 10,
          });
        },
      },
    },
    // 添加 中心统计文本 交互
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
      {
        type: 'pie-statistic-active',
      },
    ],
  };
  return <Pie {...config} />;
};
  const Pieplot = (props)=>{
    const piestyle = {
      height:'450px',
      width:'450px',
      background: 'rgba(255,255,255,.25)',
      backdropFilter: 'blur(10px) saturate(1.5)',
      borderRadius: '10px',
      padding: '10px',
    }
    return(
      <div style={piestyle}>
        {/* <DemoPie /> */}
      </div>
    )
  }
export default Pieplot