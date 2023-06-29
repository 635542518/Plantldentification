//@ts-nocheck
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { GeographicHeatmap } from '@ant-design/maps';
import { getAll } from '../../modules/database_mod';

const DemoGeographicHeatmap = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getAll().then((res: any) => {
      let checkData = []
      res.forEach((v,i)=>{
        let size = 0
        if(v['name'].slice(-2)=='健康'){size=1}
        if(v['name'].slice(-2)=='一般'){size=2}
        if(v['name'].slice(-2)=='严重'){size=3}
        if(props.check[i]){
          checkData.push({lng:v['lng'],lat:v['lat'],t:size})
        }
      })
      setData(checkData)

    })
  }, []);

  const config = {
    map: {
      type: 'amap',
      zoom: 12,
      center: [112.98016, 22.93020],
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
      height:props.height!=undefined?props.height:'280px',
      width:props.width!=undefined?props.width:'280px',
      borderRadius: '10px',
      overflow:'hidden'
    }
    return(
      <div style={mapstyle}>
        <DemoGeographicHeatmap check={props.check}/>
      </div>
    )
  }
  export default Heatmap