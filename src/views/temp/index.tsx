import React, { useState, useEffect, useContext, createContext } from 'react';
import ImageRecognition from '../imageRecognition';
import { identifyImg } from '../../modules/img_identify_mod'
import { getAll,remove } from '../../modules/database_mod'
import './temp.scss'
import type { UploadProps } from 'antd';
import { Collapse, message, Upload, Image as AntImage, Button } from 'antd';
import Pieplot from '../../component/pieplot';
import Barplot from '../../component/barplot';
import { CaretRightOutlined, SyncOutlined } from '@ant-design/icons';
import Suggestion from '../../component/suggestion';
const { Panel } = Collapse;
const { Dragger } = Upload;

interface UploadImgData {
  name: string;
  lng: number;
  lat: number;
  outPutData:string;
  imgName:string;
  address:string;
  speed:number;
}


function parserImgData(result:{name: string,value: number;}[],lng:number,lat:number,imgName:string,address:string,speedTime:number):UploadImgData{
  let maxVal = result[0]['value']
  let maxIdx = 0
  let outPutData = '['
  result.forEach((v,i)=>{
    if(v['value']>maxVal){
      maxVal = v['value']
      maxIdx = i
    }
    if(i==result.length-1){
      outPutData+=JSON.stringify(v)
    }else{
    outPutData+=JSON.stringify(v)+','
    }
  })
  outPutData+=']'
  let res:UploadImgData = {
    name: result[maxIdx]['name'],
    lng: lng,
    lat: lat,
    outPutData:outPutData,
    imgName:imgName,
    address:address,
    speed:speedTime
  }
  return res
}

const ResultImgs = (props:any)=>{

  return(<div className='ResultBox'>
  <div className='HistoryCollapseStyle'>
      <div style={{ margin: '10px 10px' }}>
      </div>
      <Collapse accordion ghost collapsible="icon" bordered={false} expandIcon={({ isActive }: any) => <CaretRightOutlined style={{ color: 'white' }} rotate={isActive ? 90 : 0} />}>
          {
              props.data != undefined ? props.data.map((v:any, i:any) => {
                  let data = JSON.parse(v['outPutData'])
                  let status: string = ''
                  if (v['name'].slice(-2) == '健康') {
                      status = `#71ef71`
                  }else if (v['name'].slice(-2) == '一般') {
                      status = `#fdd791`
                  }else if (v['name'].slice(-2) == '严重') {
                      status = `red`
                  }else{
                    status = '#e6e6e6'
                  }
                  return (
                      <Panel header={
                          <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold',color:'white' }}>
                              <div>
                                <div>{v['name']}{'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}{'识别速度:' + v['speed'] + '(ms)'}</div><div>{v['address']}</div>
                              </div>
                              <div style={{ background: status, height: '10px', width: '10px', marginLeft: '10px',marginRight: '30px', borderRadius: '10px' }}>
                              </div>
                              <Suggestion title={v['name']}/>
                          </div>
                      }
                          key={i}
                          className='PanelStyle'>
                          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                              <AntImage src={`http://localhost:3000/files/${v['imgName']}`} width={300} height={300} style={{ borderRadius: 10 }} />
                              <Barplot width='280px' height='280px' data={data} />
                              <Pieplot width='280px' height='280px' data={data} />
                          </div>
                      </Panel>
                  )
              }) : <div></div>
          }
      </Collapse>
  </div>
</div>)
}

const App: React.FC = () => {
  const [filenames,setFilenames] = useState<string[]>([])
  const [data, setData] = useState<any[]>([])
  async function pushData(Data:UploadImgData){

  }
  let newFilename:string
  const props: UploadProps = {
    name: 'file',
    multiple: true,
    showUploadList: false,
    action: 'http://localhost:3000/files',
    accept:"image/png, image/jpeg",
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        message.loading({ content: 'Loading...',key:'1'});
      }
      if (status === 'done') {
        newFilename = info.file.response['filename']
        async function identifySuccess(filename:string){
          let response = await fetch('https://restapi.amap.com/v3/ip?=&output=JSON&key=73653ae946f02b0cb1e8c35957f0bd12')
          let data = await response.json();
          const [lng,lat] = data.rectangle.split(';')[0].split(',')
          response = await fetch(`https://restapi.amap.com/v3/geocode/regeo?output=JSON&location=${lng},${lat}&key=73653ae946f02b0cb1e8c35957f0bd12&radius=1000&extensions=all`)
          data = await response.json()
          const address = data.regeocode.formatted_address
          const startTime = new Date()
          const imgresult = await identifyImg(`http://localhost:3000/files/${filename}`)
          const endTime = new Date()
          const speedTime = (endTime.getTime() - startTime.getTime()) as number;
          const options = {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(parserImgData(imgresult,lng,lat,filename,address,speedTime))
          };
          fetch('http://localhost:3000/users/', options)
            .then(response => response.json())
            .then(async response => {
              const allData = await getAll() as any
              let fileNameList = info.fileList.map((v)=>{
                message.success({content:`识别成功`,key:'1'});
                return v.response.filename
              })
              setData(allData.filter((items:any)=>fileNameList.includes(items['imgName'])))
            })
            .catch(err => console.error(err));

        }
        identifySuccess(newFilename)
      } else if (status === 'error') {
      }
      
    },
    onDrop(e) {
      // console.log('Dropped files', e.dataTransfer.files);
    },

  };

  return (
      <div>
        <ResultImgs data = {data}/>
          <Dragger {...props} className='ImageRecognition' style={{border: 'dashed 1px white'}}>
            <ImageRecognition />
          </Dragger>
      </div>
  )
};

export default App;
