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

import React, { createContext, useContext, useState } from 'react';
import MyComponent from "../adcode";
import { create } from "domain";

export const MyContext = createContext<[any, React.Dispatch<React.SetStateAction<any>>] | undefined>(undefined);

const styleLoginBG = {
    backgroundImage: `url(${LoginBG})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'block',
    opacity: '2'
}
function Login(){
    const [identifyData, setIdentifyDate] = useState([])
    return (
        <MyContext.Provider value={[identifyData, setIdentifyDate]}>
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
                    <Heatmap/>
                </div>
            </section>
            <footer>
                <Text />
            </footer>
        </div>
        </MyContext.Provider>
    )
}
export default Login;