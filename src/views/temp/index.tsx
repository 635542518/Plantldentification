import React, { useState, useEffect, useContext } from 'react';
import ImageRecognition from '../imageRecognition';
import { identifyImg } from '../../modules/identify_mod'
import { getAll,remove } from '../../modules/database_mod'
import { MyContext } from '../../App';
import './temp.scss'
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';

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

function pushData(Data:UploadImgData){
  const options = {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(Data)
  };
  
  fetch('http://localhost:3000/users/', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
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

let reader = new FileReader()
let fileImg = new Image();
fileImg.crossOrigin = ''
const IMGSIZE = 224



const App: React.FC = () => {
  const {identifyData,setIdentifyData} = useContext(MyContext)!;
  const {filename,setFilename} = useContext(MyContext)!;

  useEffect(()=>{
    const imgCanvas:CanvasRenderingContext2D|null = document.querySelector('canvas')!.getContext('2d')
    reader.onload = function(event) {
      fileImg.src = event.target!.result as string
    }

    fileImg.onload = async function(){  
      imgCanvas!.clearRect(0, 0, IMGSIZE, IMGSIZE);
      imgCanvas!.drawImage(fileImg, 0, 0,IMGSIZE,IMGSIZE);
      let imgData:ImageData|undefined = imgCanvas?.getImageData(0, 0, IMGSIZE, IMGSIZE);
      const options = {method: 'GET'};
      let response = await fetch('https://restapi.amap.com/v3/ip?=&output=JSON&key=73653ae946f02b0cb1e8c35957f0bd12', options)
      let data = await response.json();
      const [lng,lat] = data.rectangle.split(';')[0].split(',')
      response = await fetch(`https://restapi.amap.com/v3/geocode/regeo?output=JSON&location=${lng},${lat}&key=73653ae946f02b0cb1e8c35957f0bd12&radius=1000&extensions=all`)
      data = await response.json()
      const address = data.regeocode.formatted_address 
      const startTime = new Date()
      identifyImg(imgData!).then((result:any)=>{
          setIdentifyData(result)
          const endTime = new Date()
          const speedTime = (endTime.getTime() - startTime.getTime()) as number;
          pushData(parserImgData(result,lng,lat,filename,address,speedTime))
      })
    }
  },[])


  const props: UploadProps = {
    
    name: 'file',
    multiple: true,
    showUploadList: false,
    action: 'http://localhost:3000/files',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        message.loading({ content: 'Loading...',key:'1'});
        getAll()
      }
      if (status === 'done') {

        message.success({content:`${info.file.response['filename']} 识别成功`,key:'1'});
        fileImg.src=`http://localhost:3000/files/${info.file.response['filename']}`
        setFilename(info.file.response['filename'])

      } else if (status === 'error') {
      }
      
    },
    onDrop(e) {
      // console.log('Dropped files', e.dataTransfer.files);
    },

  };


  return (<div>
    <canvas height={IMGSIZE} width={IMGSIZE}></canvas>
    <Dragger {...props} className='ImageRecognition' style={{border: 'dashed 1px white'}}>
      <ImageRecognition />
    </Dragger>
  </div>
  )
};

export default App;
