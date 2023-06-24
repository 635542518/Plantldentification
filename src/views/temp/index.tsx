import React, { useState, useEffect, useContext } from 'react';
import ImageRecognition from '../imageRecognition';
import { identifyImg } from '../../modules/identify_mod'
import { MyContext } from '../login';
import './temp.scss'
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';

const { Dragger } = Upload;

let reader = new FileReader()
let fileImg = new Image();
fileImg.crossOrigin = ''
const IMGSIZE = 224

const props: UploadProps = {
  name: 'file',
  multiple: true,
  showUploadList: false,
  action: 'http://localhost:3000/files',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      // console.log(info.file, info.fileList)
      message.success(`识别中`);
    }
    if (status === 'done') {
      message.success(`${info.file.response['filename']} 识别成功`);
      fileImg.src=`http://localhost:3000/files/${info.file.response['filename']}`
    } else if (status === 'error') {
      message.error(`预料之外的错误......`);
    }
  },
  onDrop(e) {
    // console.log('Dropped files', e.dataTransfer.files);
  },
};

const App: React.FC = () => {
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

  return (<div>
    <canvas height={IMGSIZE} width={IMGSIZE}></canvas>
    <Dragger {...props} className='ImageRecognition'>
      <ImageRecognition />
    </Dragger>
  </div>
  )
};

// const DragAndDropUploader: React.FC = (props) => {
//   const identifyData = useContext(MyContext);
//   useEffect(() => {
//     const imgCanvas: CanvasRenderingContext2D | null = document.querySelector('canvas')!.getContext('2d')

//     reader.onload = function (event) {
//       fileImg.src = event.target!.result as string
//     }

//     fileImg.onload = function () {
//       imgCanvas!.clearRect(0, 0, IMGSIZE, IMGSIZE);
//       imgCanvas!.drawImage(fileImg, 0, 0, IMGSIZE, IMGSIZE);
//       let imgData: ImageData | undefined = imgCanvas?.getImageData(0, 0, IMGSIZE, IMGSIZE);
//       identifyImg(imgData!).then((result) => {
//         identifyData![1](result)
//       })
//     }
//   }, [])

//   const [dragging, setDragging] = useState(false);

//   const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     setDragging(true);
//   };

//   const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     setDragging(false);
//   };

//   const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//   };

//   const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {

//     event.preventDefault();
//     setDragging(false);
//     const files = event.dataTransfer.files
//     console.log(files)
//     // 处理上传的文件
//     reader.readAsDataURL(files[0]);


//   };

//   return (
//     <div
//       className={`dropzone ${dragging ? 'dragging' : ''}`}
//       onDragEnter={handleDragEnter}
//       onDragLeave={handleDragLeave}
//       onDragOver={handleDragOver}
//       onDrop={handleDrop}
//     >
//       <ImageRecognition />
//     </div>
//   );
// };

// export default DragAndDropUploader;
export default App;
