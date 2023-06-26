import "./identify.scss"
import { PictureFilled } from '@ant-design/icons';
import { YoutubeFilled } from '@ant-design/icons';
import React from 'react';
import { Col, Divider, Row } from 'antd';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


function Identify() {
    return (
        <div className="identify-box">
            <Link to="/ImageRecognitionIndex">
                <div className="identify-button">
                    <PictureFilled className="identify-img" />
                    <p>图片识别</p>
                </div>
            </Link>
            <div className="identify-button">
                <YoutubeFilled className="identify-img" />
                <p>视频识别</p>
            </div>
        </div>

    )
}
export default Identify;