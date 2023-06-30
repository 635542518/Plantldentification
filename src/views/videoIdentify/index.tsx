import React, { useState, useEffect, useContext } from 'react';
import { identifyVideo } from '../../modules/identify_mod'
import './videoIdentify.scss'
import { MyContext } from '../../App';
import { Button, Popover, Switch, message } from 'antd';
import { LoadingOutlined, RollbackOutlined } from '@ant-design/icons';
import Suggestion from '../../component/suggestion'
import config from '../../porject-config';
import { parserImgData } from '../temp';
import transformData from '../../modules/parser_result';
let identifySpeed = 0
let identifyResult:{
    name: string;
    value: number;
}[] = []
let identifyResultMax:{
    name: string;
    value: number;
} = {name:'未识别到植物',value:0}

function VideoIdentify() {
    const [resultObject, setResultObject] = useState<any>({ name: '未识别到植物', value: 0 })
    const [autoIdentify, setAutoIdentify] = useState<any>(false)
    
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
                identifyResultMax = result.reduce(function (prev, current) {
                    return (prev.value > current.value) ? prev : current;
                })
                setResultObject(identifyResultMax)
            })
        }, 150)
        return () => {
            clearInterval(timesend)
        }
    }, [])
    const backBtn = () => {
        window.location.href = '/#/login'
    }

    const takePhoto = async (e:any) => {
        if (identifyResultMax['name']=="未识别到植物"){
            if(e){message.warning('未识别到植物！')}
            return
        }
        if(e){message.success('结果保存成功！')}
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
            <div style={{ color: 'white', textAlign: 'center'}}>
                植物种类:{parserResult['name']}<br/>
                植物病害:{parserResult['disease']}<br/>
                病害程度:{parserResult['level']}
            </div>
            {resultObject['name']=="未识别到植物"?(
            <div style={{ color: 'white', textAlign: 'center',height:'20px' }}>
                
            </div>):(
                <div style={{ color: 'white', textAlign: 'center' ,height:'20px'}}>
                    置信度:{resultObject['value']}%
                </div>
            )}
            {autoIdentify?(<div style={{textAlign:'center',marginTop:'10px',height:'26px'}}>
                自动监测中<LoadingOutlined style={{ fontSize: 24 }} spin />
            </div>):(<div style={{marginTop:'10px',height:'26px'}}></div>)}
            <div className='vdo'>
                <video style={{borderRadius: '10px'}}></video>
                <div style={{width:'448px',margin:'auto'}}>
                <div style={{color:'white',margin:'5px 0px',display:'flex',justifyContent:'space-between'}}>
                        <Popover content={(<div>自动将识别到的植物记录至数据库中，可在识别记录中查看</div>)} title="提示">
                            自动监测：<Switch checkedChildren="开启" unCheckedChildren="关闭" onChange={(e)=>{
                                let saveDataInterval = undefined
                                if(e){
                                    setAutoIdentify(true)
                                    saveDataInterval = setInterval(()=>{
                                        takePhoto(false)
                                    },3000)
                                }else{
                                    setAutoIdentify(false)
                                    clearInterval(saveDataInterval)
                                }
                            }}/>
                        </Popover>
                </div>
                <div style={{display: 'flex',width: '100%',justifyContent: 'space-between'}}>
                    <Button ghost onClick={takePhoto} style={{ background: 'rgba(255,255,255,.25)', color: 'white', border: 'none' }}>保存结果</Button>
                    <Suggestion title={resultObject['name']} />
                </div>
                </div>
            </div>
        </div>
    );
}
export default VideoIdentify;