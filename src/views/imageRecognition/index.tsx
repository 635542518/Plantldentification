import "./imageRecognition.scss";
import { CameraFilled, FileImageFilled } from '@ant-design/icons';

import { PictureOutlined } from '@ant-design/icons';

const goToHistory = (event:any)=>{
    event.stopPropagation();
    window.location.href = '/#/ImageRecognitionIndex'
}
const goToVideoIdentify = (event:any)=>{
    event.stopPropagation();
    window.location.href = '/#/VideoRecognitionIndex'
}
function ImageRecognition() {
    return(
        <section >
            <div>将图像拖动到此处</div>
            <div>— 或 —</div>
            <div className="ImageRecognitionButton">
                <button style={{color:'white'}} onClick={goToVideoIdentify}><CameraFilled />视频识别</button>
                {/* <button style={{color:'white'}} onClick={(event)=>{event.stopPropagation();}}><FileImageOutlined />粘贴图像或URL</button> */}
                <button style={{color:'white'}} onClick={goToHistory}><FileImageFilled />识别记录</button>
            </div>
        </section>
    )
}
export default ImageRecognition;