import React, { useState , useEffect,useContext} from 'react';
import ImageRecognition from '../imageRecognition';
import {identifyImg} from '../../modules/identify_mod'
import {MyContext} from '../login';

let reader = new FileReader()
let fileImg = new Image();
const IMGSIZE = 224


const DragAndDropUploader: React.FC = (props) => {
  const identifyData = useContext(MyContext);
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
      })
    }
  },[])

  const [dragging, setDragging] = useState(false);

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);

    const files = event.dataTransfer.files;
    // 处理上传的文件
    reader.readAsDataURL(files[0]);

    
  };

  return (
    <div
      className={`dropzone ${dragging ? 'dragging' : ''}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <canvas height={IMGSIZE} width={IMGSIZE}></canvas>
      <ImageRecognition />
    </div>
  );
};

export default DragAndDropUploader;