import React, { useState , useEffect, useContext} from 'react';
import {identifyVideo} from '../../modules/identify_mod'
import './videoIdentify.scss'
import { MyContext } from '../../App';
import { Button } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import Suggestion from '../../component/suggestion'

function VideoIdentify(){
    const [resultObject,setResultObject] = useState<any>({name:'',value:0})
    useEffect(()=>{
        const canvas = document.createElement('canvas');
        let imgsize = 224

        canvas.width = imgsize
        canvas.height = imgsize

        const ctx = canvas.getContext('2d')!
        const video = document.querySelector('video')!;
        // var constraints = { audio: false, video: { height: 480, width: 1000 } };
        var constraints = { audio: false, video: { height: 224*2, width: 224*2 } };

        navigator.mediaDevices.getUserMedia(constraints)
        .then(function (mediaStream) {
            video.srcObject = mediaStream;
            video.onloadedmetadata = function (e) {
                video.play();
            };
        }).catch(function (err) { console.log(err.name + ": " + err.message); });

        let timesend = setInterval(async () => {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
            let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            identifyVideo(imageData!).then(result=>{
                setResultObject(result.reduce(function(prev, current) {
                    return (prev.value > current.value) ? prev : current;
                }))
            })
        }, 150)
        return ()=>{
            clearInterval(timesend)
        }
    },[])
    const backBtn = ()=>{
        window.location.href='/#/login'
    }
    return (
        <div className='vdoBox'>
            <Button onClick={backBtn} icon={<RollbackOutlined style={{ color: 'white' }} />} ghost style={{ background: 'rgba(255,255,255,.25)', color: 'white', border: 'none' }}></Button>
            <div style={{color:'white',textAlign:'center'}}>
                识别结果:{resultObject['name']}
            </div>
                <div style={{color:'white',textAlign:'center'}}>
                置信度:{resultObject['value']}%
            </div>
            <video className='vdo'></video>
            <div style={{background: 'rgba(255, 255, 255, 0.25)',color: 'white',border: 'none',position: 'absolute',left: '50%',bottom:'1%',transform: 'translate(-50%,-50%)'}}>
                <Suggestion title={resultObject['name']} />
            </div>
        </div>
      );
}
export default VideoIdentify;