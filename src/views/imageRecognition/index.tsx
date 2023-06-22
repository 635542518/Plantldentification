import "./imageRecognition.scss";
import { CameraFilled } from '@ant-design/icons';
import { FileImageOutlined } from '@ant-design/icons';
import { PictureOutlined } from '@ant-design/icons';
function ImageRecognition() {
    return(
        <section className='ImageRecognition'>
            <div>将图像拖动到此处</div>
            <div>— 或 —</div>
            <div className="ImageRecognitionButton">
                <button style={{color:'white'}}><CameraFilled />拍照</button>
                <button style={{color:'white'}}><FileImageOutlined />粘贴图像或URL</button>
                <button style={{color:'white'}}><PictureOutlined />浏览</button>
            </div>
        </section>
    )
}
export default ImageRecognition;