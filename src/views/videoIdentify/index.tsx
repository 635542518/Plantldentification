import React, { useState , useEffect} from 'react';
import {identifyImg} from '../../modules/identify_mod'
import './videoIdentify.scss'


function VideoIdentify(){
    useEffect(()=>{
        const canvas = document.querySelector('canvas')!
        let imgsize = 224
        canvas.width = imgsize
        canvas.height = imgsize

        const ctx = canvas.getContext('2d')!
        const video = document.querySelector('video')!;
        var constraints = { audio: false, video: { height: imgsize, width: imgsize } };
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
            identifyImg(imageData!).then(result=>{
                console.log(result[0])
            })
        }, 150)
    },[])
    return (
        <div>
            <canvas className='cvs'></canvas>
            <video></video>
        </div>
      );
}
export default VideoIdentify;