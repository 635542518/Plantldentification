// @ts-nocheck
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { GeographicHeatmap } from '@ant-design/maps';

const DemoGeographicHeatmap = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([{ lng: 104.101, lat: 30.649, t: 24.6, n: 'chengdu' }])
    //数据暂时先这样
  }, []);

  const config = {
    map: {
      type: 'amap',
      zoom: 1.5,
      center: [120.19660949707033, 30.234747338474293],
      pitch: 0,
    },
    source: {
        data: data,
        parser: { type: 'json', x: 'lng', y: 'lat' }
      },
    size: {
        field: 't',
        value: [0, 1],
    },
    style: {
      intensity: 2,
      radius: 15,
      opacity: 1,
      colorsRamp: [
        {
          color: 'rgba(33,102,172,0.0)',
          position: 0,
        },
        {
          color: 'rgb(103,169,207)',
          position: 0.2,
        },
        {
          color: 'rgb(209,229,240)',
          position: 0.4,
        },
        {
          color: 'rgb(253,219,199)',
          position: 0.6,
        },
        {
          color: 'rgb(239,138,98)',
          position: 0.8,
        },
        {
          color: 'rgb(178,24,43,1.0)',
          position: 1,
        },
      ],
    },
    zoom: {
      position: 'bottomright',
    },
    legend: {
      position: 'bottomleft',
    },
  };

  return <GeographicHeatmap {...config} />;
};
const Heatmap = (props)=>{
    const mapstyle = {
      height:'450px',
      width:'450px',
      background: 'rgba(255,255,255,.25)',
      backdropFilter: 'blur(10px) saturate(1.5)',
      borderRadius: '10px',
      padding: '10px',
    }
    return(
      <div style={mapstyle}>
        <DemoGeographicHeatmap />
      </div>
    )
  }
  export default Heatmap