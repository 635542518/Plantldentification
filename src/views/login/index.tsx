import "./login.scss"
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

import React, { createContext, useContext, useState } from 'react';
import MyComponent from "../adcode";
import { create } from "domain";



const styleLoginBG = {
    backgroundImage: `url(${LoginBG})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'block',
    opacity: '2'
}
function Login(){
    
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
                    {/* <ImageRecognition /> */}
                    {/* <Identify /> */}
                    {/* <DragAndDropUploader /> */}
                    {/* <VideoIdentify/> */}
                    {/* <Barplot/> */}
                    {/* <Pieplot/> */}
                    {/* <Heatmap/> */}
                    <HistoryCollapse/>
                </div>
            </section>
            <footer>
                <Text />
            </footer>
        </div>
    )
}
export default Login;