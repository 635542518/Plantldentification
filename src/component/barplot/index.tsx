//@ts-nocheck
import { Column } from '@ant-design/plots';
import { each, groupBy } from '@antv/util';
import './barplot.scss'
import React, { useContext, useEffect, useState } from 'react';
import {MyContext} from '../../App';

const plantName:string[] = ["苹果","葡萄","桃","辣椒","马铃薯","草莓","番茄","樱桃","玉米","未识别到植物"]

const DemoColumn = (props:any) => {
  let data = props.data!=undefined?props.data:[]
  data = data.sort((a,b)=>b.value-a.value)
  let parserData = []
  data.forEach((v:any)=>{
    let thisPlantName:string = ''
    let thisPlantDisease:string = ''
    for(let i=0;i<plantName.length;i++){
      if(v['name'].includes(plantName[i])){
        thisPlantName=plantName[i]
        thisPlantDisease = v['name'].slice(thisPlantName.length)
        break
      }
    }
    if(v['value']>0.1){
      parserData.push({name:thisPlantName,disease:thisPlantDisease,value:Number(v['value'].toFixed(1))})
    }
  })
  data = parserData
  const annotations:any = [];
  each(groupBy(data, 'name'), (values, k) => {
    const value = Number((values.reduce((a:any, b:any) => a + b.value, 0)).toFixed(1));
    annotations.push({
      type: 'text',
      position: [k, value],
      content: `${value}`,
      style: {
        textAlign: 'center',
        fontSize: 14,
        fill: 'rgba(0,0,0,0.85)',
      },
      offsetY: -10,
    });
  });

  const config = {
    data,
    isStack: true,
    xField: 'name',
    yField: 'value',
    seriesField: 'disease',
    appendPadding:[30,0,0,20],
    xAxis:{
      title:{
        text:'植物种类'
      },
      label: {
        // autoRotate: true,
        rotate:7
        }
    },
    yAxis:{
      title:{
        text:'置信度(%)'
      },
      label: {
        autoRotate: true,
        }
    },
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle'
      // 可配置附加的布局方法
      formatter:(x)=>{
        if(x['value']>5)return x['value']
      },
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: 'interval-adjust-position',
        }, // 数据标签防遮挡
        {
          type: 'interval-hide-overlap',
        }, // 数据标签文颜色自动调整
        {
          type: 'adjust-color',
        },
      ],
    },
    // 使用 annotation （图形标注）来展示：总数的 label
    annotations,
  };

  return <Column {...config} />;
};

const Barplot = (props:any)=>{
  let barstyle = {
    height:props.height!=undefined?props.height:'280px',
    width:props.width!=undefined?props.width:'280px',
    // background: 'rgba(255,255,255,.25)',
    background: 'white',
    backdropFilter: 'blur(10px) saturate(1.5)',
    borderRadius: '10px',
    padding: '10px',
    textAlign: 'center'
  }
  return(
    <div style={barstyle}>
      <DemoColumn data = {props.data}/>
    </div>
  )
}
export default Barplot