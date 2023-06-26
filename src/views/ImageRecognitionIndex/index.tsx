import "./imageRecognitionIndex.scss"
import LoginBG from "../../images/banner.jpg";
import Text from '../text';
import Weather from '../weather';
import Logo from '../logo';
import Identify from '../identify';
import ImageRecognition from '../imageRecognition';
import DragAndDropUploader from '../temp';
import VideoIdentify from '../videoIdentify'
import Barplot from '../../component/barplot'
import Pieplot from '../../component/pieplot'
import Heatmap from '../../component/heatmap'
import HistoryCollapse from '../history'
import {MyContext} from '../../App';


import React, { createContext, useContext, useState } from 'react';
import MyComponent from "../adcode";
import { create } from "domain";
import { Carousel } from 'antd';

const styleLoginBG = {
    backgroundImage: `url(${LoginBG})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'block',
    opacity: '2'
}


function ImageRecognitionIndex(){
    return (
        <div className="body-box">
            <div className="login-container" style={styleLoginBG}>
                <div className='cover' >
                </div>
            </div>
            <section className="header-box">
                <Logo />
                <Weather />
            </section>
            <section>
                <div className="App">
                    {/* 图片识别box */}
                    {/* <ImageRecognition /> */}
                    {/* 选择box */}
                    {/* <Identify /> */}
                    {/* 图片上传box */}
                    <DragAndDropUploader />
                    {/* 视频识别 */}
                    {/* <VideoIdentify/> */}
                    {/* 病害率 */}
                    {/* <Barplot/> */}
                    {/* 健康情况 */}
                    {/* <Pieplot/> */}
                    {/* 饼图 */}
                    {/* <Heatmap/> */}
                    {/* 历史记录 */}
                    {/* <HistoryCollapse/> */}



                    
                    {/* <Carousel autoplay>
                    <div>
                        <span>1</span>
                    </div>
                    <div>
                        <span>1</span>
                    </div>
                    <div>
                        <span>1</span>
                    </div>
                    </Carousel> */}
                </div>
            </section>
            <footer>
                <Text />
            </footer>
        </div>
    )
}

function DataRrocessing(){
    
}


function RecognitionResultDef(){
    const {filename,setFilename} = useContext(MyContext)!;
    const filenameurl =  'http://localhost:3000/files/' + filename;

    return (
        <div className="body-box imageRecognitionIndexBbox">
            <div className="login-container" style={styleLoginBG}>
                <div className='cover' >
                </div>
            </div>
            <section className="imageRecognitionIndexLeft">
                <img src={filenameurl} alt="" />
            </section>
            <section>
                <div className="App imageRecognitionIndexRight">
                    {/* 图片识别box */}
                    {/* <ImageRecognition /> */}
                    {/* 选择box */}
                    {/* <Identify /> */}
                    {/* 图片上传box */}
                    {/* <DragAndDropUploader /> */}
                    {/* 视频识别 */}
                    {/* <VideoIdentify/> */}
                    {/* 病害率 */}
                    {/* <Barplot/> */}
                    {/* 健康情况 */}
                    <Pieplot/>
                    {/* 饼图 */}
                    {/* <Heatmap/> */}
                    {/* 历史记录 */}
                    {/* <HistoryCollapse/> */}
                </div>
            </section>
            <footer>
                <Text />
            </footer>
        </div>
    )
}

function App(){
    const {identifyData,setIdentifyData} = useContext(MyContext)!;
    return identifyData.length!=0?< RecognitionResultDef/>:<ImageRecognitionIndex/>
    
}
export default App