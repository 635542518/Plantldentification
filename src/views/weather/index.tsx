import './weather.scss';
import area from '../../images/weizhi.png';
import Weatherimg from '../../images/yin.png';
import { useEffect } from 'react';
const stylearea = {
    backgroundImage: `url(${area})`,
    display: 'inline-block',
}
const styleWeatherimg = {
    backgroundImage: `url(${Weatherimg})`,
    display: 'block'

}



function Weather() {
    useEffect(()=>{
        
    },[])
    fetch('https://wis.qq.com/weather/common?source=pc&weather_type=observe|forecast_1h|forecast_24h|index|alarm|limit|tips|rise&province=广东省&city=佛山市&county=&callback=jQuery111305289544419270891_1687771434774&_=1687771434776')
        .then(response=>{response.json()})
        .then(data=>{console.log(data)})
    return (
        <div className="Weather-box">
            <header>
                <div>
                    <div className='inline-block'>南海区</div>
                    <div className="Weather" style={stylearea}></div>
                </div>
                <div>
                    <div style={styleWeatherimg} className='Weatherimg'></div>
    
                </div>
            </header>
            <footer>
                <div className="weatherFooterBox">
                    <div style={styleWeatherimg} className='Weatherimg'></div>

                </div>
                
                
            </footer>
        </div>
    )
}





export default Weather;