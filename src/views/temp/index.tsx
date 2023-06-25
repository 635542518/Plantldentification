import React, { useState, useEffect, useContext } from 'react';
import ImageRecognition from '../imageRecognition';
import { identifyImg } from '../../modules/identify_mod'
import { getAll,remove } from '../../modules/database_mod'
import { MyContext } from '../login';
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

function parserImgData(result:{name: string,value: number;}[],lng:number,lat:number,imgName:string):UploadImgData{
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
    imgName:imgName
  }
  return res
}

let reader = new FileReader()
let fileImg = new Image();
fileImg.crossOrigin = ''
const IMGSIZE = 224
let lat = 0
let lng = 0


function showPosition(position:any) {
  lat = position.coords.latitude;
  lng = position.coords.longitude;
}
navigator.geolocation.getCurrentPosition(showPosition);



const App: React.FC = () => {
  const identifyData = useContext(MyContext);
  let filename = ''

  useEffect(()=>{
    const imgCanvas:CanvasRenderingContext2D|null = document.querySelector('canvas')!.getContext('2d')
    
    reader.onload = function(event) {
      fileImg.src = event.target!.result as string
    }

    fileImg.onload = function(){  
      imgCanvas!.clearRect(0, 0, IMGSIZE, IMGSIZE);
      imgCanvas!.drawImage(fileImg, 0, 0,IMGSIZE,IMGSIZE);
      let imgData:ImageData|undefined = imgCanvas?.getImageData(0, 0, IMGSIZE, IMGSIZE);
      identifyImg(imgData!).then((result)=>{
          identifyData![1](result)
          pushData(parserImgData(result,lat,lng,filename))
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
        message.success(`识别中`);
        getAll()
      }
      if (status === 'done') {

        message.success(`${info.file.response['filename']} 识别成功`);
        fileImg.src=`http://localhost:3000/files/${info.file.response['filename']}`
        filename = info.file.response['filename']

      } else if (status === 'error') {
        message.error(`预料之外的错误......`);
      }
    },
    onDrop(e) {
      // console.log('Dropped files', e.dataTransfer.files);
    },
  };


  return (<div>
    <canvas height={IMGSIZE} width={IMGSIZE}></canvas>
    <Dragger {...props} className='ImageRecognition'>
      <ImageRecognition />
    </Dragger>
  </div>
  )
};

export default App;
