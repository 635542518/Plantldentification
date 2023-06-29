import React, { useState, useEffect, useContext, createContext } from 'react';
import ImageRecognition from '../imageRecognition';
import { identifyImg } from '../../modules/img_identify_mod'
import { getAll } from '../../modules/database_mod'
import config from '../../porject-config'
import './temp.scss'
import type { UploadProps } from 'antd';
import { Collapse, message, Upload, Image as AntImage, Button } from 'antd';
import Pieplot from '../../component/pieplot';
import Barplot from '../../component/barplot';
import { CaretRightOutlined, SyncOutlined } from '@ant-design/icons';
import Suggestion from '../../component/suggestion';
import transformData from '../../modules/parser_result'



const { Panel } = Collapse;
const { Dragger } = Upload;

interface UploadImgData {
  name: string;
  lng: number;
  lat: number;
  outPutData: string;
  imgName: string;
  address: string;
  speed: number;
}


export function parserImgData(result: { name: string, value: number; }[], lng: number, lat: number, imgName: string, address: string, speedTime: number): UploadImgData {
  let maxVal = result[0]['value']
  let maxIdx = 0
  let outPutData = '['
  result.forEach((v, i) => {
    if (v['value'] > maxVal) {
      maxVal = v['value']
      maxIdx = i
    }
    if (i == result.length - 1) {
      outPutData += JSON.stringify(v)
    } else {
      outPutData += JSON.stringify(v) + ','
    }
  })
  outPutData += ']'
  let res: UploadImgData = {
    name: result[maxIdx]['name'],
    lng: lng,
    lat: lat,
    outPutData: outPutData,
    imgName: imgName,
    address: address,
    speed: speedTime
  }
  return res
}

const ResultImgs = (props: any) => {

  return (<div className='ResultBox'>
    {
      props.data.length == 0 ? <div className='HistoryCollapseStyle' style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
        <div className='NoneDate'>
          下方点击选择/拖拽图片以进行识别<br />
          (支持批量识别)
        </div>
      </div> : (<div className='HistoryCollapseStyle'>
        <div style={{ margin: '10px 10px' }}>
        </div>
        <Collapse defaultActiveKey={['0']} accordion ghost collapsible="icon" bordered={false} expandIcon={({ isActive }: any) => <CaretRightOutlined style={{ color: 'white' }} rotate={isActive ? 90 : 0} />}>
          {
            props.data != undefined ? props.data.map((v: any, i: any) => {
              let data = JSON.parse(v['outPutData'])
              let status: string = ''
              if (v['name'].slice(-2) == '健康') {
                status = `#71ef71`
              } else if (v['name'].slice(-2) == '一般') {
                status = `#fdd791`
              } else if (v['name'].slice(-2) == '严重') {
                status = `red`
              } else {
                status = '#e6e6e6'
              }
              let parserName = transformData(v['name'])!
              return (
                <Panel header={
                  <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', color: 'white', width: '100%', justifyContent: 'space-between' }}>
                    <div>
                      <div>
                        植物种类:{parserName['name']}
                        {'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}
                        植物病害:{parserName['disease']}
                        {'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}
                        病害程度:{parserName['level']}
                        {'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}
                        {'识别速度:' + v['speed'] + '(ms)'}
                        {'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}
                        {'识别时间:' + v['datetime']}
                      </div>
                      <div>
                        {v['address']}
                        {'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}
                        {'识别时间:' + v['datetime'].split(/T|\./g)[0] + ' ' + v['datetime'].split(/T|\./g)[1]}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ background: status, height: '10px', width: '10px', marginRight: '30px', borderRadius: '10px' }}>
                      </div>
                      <Suggestion title={v['name']} />
                    </div>
                  </div>
                }
                  key={i}
                  className='PanelStyle'>
                  <div>
                    <div style={{ color: 'white', fontWeight: 'bold', display: 'flex', justifyContent: "space-around" }}>
                      <div>
                        识别图像
                      </div>
                      <div>
                        置信度(前三)
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                      <AntImage src={`${config['webserver']}/files/${v['imgName']}`} width={335} height={335} style={{ borderRadius: 10 }} />
                      <Barplot width='315px' height='315px' data={data} />
                    </div>
                  </div>
                </Panel>
              )
            }) : <div></div>
          }
        </Collapse>
      </div>)
    }

  </div>)
}

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([])

  let newFilename: string
  const props: UploadProps = {
    name: 'file',
    multiple: true,
    showUploadList: false,
    action: `${config['webserver']}/files`,

    accept: "image/png, image/jpeg",
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        message.loading({ content: 'Loading...', key: '1' });
      }
      if (status === 'done') {
        newFilename = info.file.response['filename']
        async function identifySuccess(filename: string) {
          let response = await fetch('https://restapi.amap.com/v3/ip?=&output=JSON&key=73653ae946f02b0cb1e8c35957f0bd12')
          let data = await response.json();
          const [lng, lat] = data.rectangle.split(';')[0].split(',')
          response = await fetch(`https://restapi.amap.com/v3/geocode/regeo?output=JSON&location=${lng},${lat}&key=73653ae946f02b0cb1e8c35957f0bd12&radius=1000&extensions=all`)
          data = await response.json()
          const address = data.regeocode.formatted_address
          const startTime = new Date()
          const imgresult = await identifyImg(`${config['webserver']}/files/${filename}`)
          const endTime = new Date()
          const speedTime = (endTime.getTime() - startTime.getTime()) as number;
          const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(parserImgData(imgresult, lng, lat, filename, address, speedTime))
          };
          fetch(`${config['webserver']}/users/`, options)
            .then(response => response.json())
            .then(async response => {
              const allData = await getAll() as any
              let fileNameList = info.fileList.map((v) => {
                message.success({ content: `识别成功`, key: '1' });
                return v.response.filename
              })
              setData(allData.filter((items: any) => fileNameList.includes(items['imgName'])))
            })
            .catch(err => console.error(err));

        }
        identifySuccess(newFilename)
      } else if (status === 'error') {
      }
    },

  };

  return (
    <div>
      <ResultImgs data={data} />
      <Dragger {...props} className='ImageRecognition' style={{ border: 'dashed 1px white' }}>
        <ImageRecognition />
      </Dragger>
    </div>
  )
};

export default App;
