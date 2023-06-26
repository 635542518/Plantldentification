// @ts-nocheck
import { Column } from '@ant-design/plots';
import './barplot.scss'
import React, { useContext } from 'react';
import {MyContext} from '../../App';


const DemoColumn = (props) => {
  const {identifyData,setIdentifyData} = useContext(MyContext)!;
  let data = props.data!=undefined?props.data:identifyData
  const config = {
    data,
    xField: 'name',
    yField: 'value',
    seriesField: '',
    legend: false,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
        style: {
          fill: '#fff',
        },
      },
    },
    yAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
        style: {
          fill: '#fff',
        },
      },
    },
    brush: {
      enabled: true,
      type: 'x-rect',
    },
  };
  return <Column {...config} />;
};

const Barplot = (props)=>{
  let barstyle = {
    height:props.height!=undefined?props.height:'280px',
    width:props.width!=undefined?props.width:'280px',
    background: 'rgba(255,255,255,.25)',
    backdropFilter: 'blur(10px) saturate(1.5)',
    borderRadius: '10px',
    padding: '10px',
  }
  return(
    <div style={barstyle}>
      <DemoColumn data = {props.data}/>
    </div>
  )
}
export default Barplot