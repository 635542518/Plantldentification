import "./VideoRecognitionIndex.scss"
import LoginBG from "../../images/banner.jpg";
import Text from '../text';
import Weather from '../weather';
import Logo from '../logo';
import VideoIdentify from '../videoIdentify'
const styleLoginBG = {
    backgroundImage: `url(${LoginBG})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'block',
    opacity: '2'
}


function VideoRecognitionIndex(){
    return (
        <div className="body-box">
            <section className="header-box">
                <Logo />
                <Weather />
            </section>
            <section>
                <div className="App">
                    <VideoIdentify/>
                </div>
            </section>
            <footer>
                <Text />
            </footer>
        </div>
    )
}

export default VideoRecognitionIndex