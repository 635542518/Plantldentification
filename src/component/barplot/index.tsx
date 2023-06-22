// @ts-nocheck
import { Column } from '@ant-design/plots';
import './barplot.scss'
import React, { useContext } from 'react';
import {MyContext} from '../../views/login';


const DemoColumn = (props) => {
  const [identifyData, setIdentifyData] = useContext(MyContext)!;
  const data = identifyData

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
  const barstyle = {
    height:'450px',
    width:'450px',
    background: 'rgba(255,255,255,.25)',
    backdropFilter: 'blur(10px) saturate(1.5)',
    borderRadius: '10px',
    padding: '10px',
  }
  return(
    <div style={barstyle}>
      <DemoColumn />
    </div>
  )
}
export default Barplot