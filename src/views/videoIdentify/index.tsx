import React, { useState, useEffect, useContext } from 'react';
import { identifyVideo } from '../../modules/identify_mod'
import './videoIdentify.scss'
import { MyContext } from '../../App';
import { Button, message } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import Suggestion from '../../component/suggestion'
import config from '../../porject-config';
import { parserImgData } from '../temp';
import transformData from '../../modules/parser_result';
let identifySpeed = 0
let identifyResult:{
    name: string;
    value: number;
}[] = []

function VideoIdentify() {
    const [resultObject, setResultObject] = useState<any>({ name: '未识别到植物', value: 0 })

    useEffect(() => {
        const canvas = document.createElement('canvas');
        let imgsize = 224
        canvas.width = imgsize
        canvas.height = imgsize

        const ctx = canvas.getContext('2d')!
        const video = document.querySelector('video')!;
        var constraints = { audio: false, video: { height: 224 * 2, width: 224 * 2 } };

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
            const startTime = new Date()
            identifyVideo(imageData!).then(result => {
                const endTime = new Date()
                identifySpeed = (endTime.getTime() - startTime.getTime()) as number
                identifyResult = result
                setResultObject(result.reduce(function (prev, current) {
                    return (prev.value > current.value) ? prev : current;
                }))
            })
        }, 150)
        return () => {
            clearInterval(timesend)
        }
    }, [])
    const backBtn = () => {
        window.location.href = '/#/login'
    }

    const takePhoto = async () => {
        if (resultObject['name']=="未识别到植物"){
            message.warning('未识别到植物！')
            return
        }
        message.success('结果保存成功！')
        const video = document.querySelector('video')!;
        const canvas = document.createElement('canvas');
        let imgsize = 224
        canvas.width = imgsize
        canvas.height = imgsize
        const context = canvas.getContext('2d')!;
        context.drawImage(video, 0, 0,canvas.width, canvas.height);
        const base64Data = canvas.toDataURL('image/jpeg');
        const option = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({base64Data:base64Data})
        }
        let filename:any = await fetch(`${config['webserver']}/files/btoimg`,option)
        filename = await filename.json()
        filename = filename['filename']
        let response = await fetch('https://restapi.amap.com/v3/ip?=&output=JSON&key=73653ae946f02b0cb1e8c35957f0bd12')
        let data = await response.json();
        const [lng, lat] = data.rectangle.split(';')[0].split(',')
        response = await fetch(`https://restapi.amap.com/v3/geocode/regeo?output=JSON&location=${lng},${lat}&key=73653ae946f02b0cb1e8c35957f0bd12&radius=1000&extensions=all`)
        data = await response.json()
        const address = data.regeocode.formatted_address

        const options = {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(parserImgData(identifyResult, lng, lat, filename, address, identifySpeed))
        };
        fetch(`${config['webserver']}/users/`, options)
    }

    const parserResult = transformData(resultObject['name'])!

    return (
        <div className='vdoBox'>
            <Button onClick={backBtn} icon={<RollbackOutlined style={{ color: 'white' }} />} ghost style={{ background: 'rgba(255,255,255,.25)', color: 'white', border: 'none' }}></Button>
            <div style={{ color: 'white', textAlign: 'center',marginTop: '-20px' }}>
                植物种类:{parserResult['name']}<br/>
                植物病害:{parserResult['disease']}<br/>
                病害程度:{parserResult['level']}
            </div>
            {resultObject['name']=="未识别到植物"?(
            <div style={{ color: 'white', textAlign: 'center' }}>
                
            </div>):(
                <div style={{ color: 'white', textAlign: 'center' }}>
                    置信度:{resultObject['value']}%
                </div>
            )}
            <video className='vdo'></video>
            <div style={{ color: 'white', border: 'none', position: 'absolute', left: '50%', bottom: '1%', transform: 'translate(-50%,-50%)',display: 'flex',width: '448px',justifyContent: 'space-between'}}>
                <Button ghost onClick={takePhoto} style={{ background: 'rgba(255,255,255,.25)', color: 'white', border: 'none' }}>保存结果</Button>
                <Suggestion title={resultObject['name']} />
            </div>
        </div>
    );
}
export default VideoIdentify;