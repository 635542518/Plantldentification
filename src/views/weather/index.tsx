import './weather.scss';
import area from '../../images/weizhi.png';
import Weatherimg from '../../images/yin.png';
import { useEffect, useState } from 'react';




function Weather() {
    let initdata =  {
        "location": {
            "id": "WS07NB3R6P5J",
            "name": "南海",
            "country": "CN",
            "path": "南海,佛山,广东,中国",
            "timezone": "Asia/Shanghai",
            "timezone_offset": "+08:00"
        },
        "now": {
            "text": "晴",
            "code": "0",
            "temperature": "32",
            "feels_like": "41",
            "pressure": "1004",
            "humidity": "64",
            "visibility": "30.0",
            "wind_direction": "南",
            "wind_direction_degree": "164",
            "wind_speed": "6.0",
            "wind_scale": "2",
            "clouds": "15",
            "dew_point": ""
        },
        "last_update": "2023-06-27T17:50:10+08:00"
    }
    const [location,setLocation] = useState<any>(initdata)
    const [temperatures,setTemperatures] = useState<string[]>([])
    useEffect(()=>{
        async function getTemp(){
            let response = await fetch('https://restapi.amap.com/v3/ip?=&output=JSON&key=73653ae946f02b0cb1e8c35957f0bd12')
            let data = await response.json();
            const [lng,lat] = data.rectangle.split(';')[0].split(',')
            response = await fetch(`https://restapi.amap.com/v3/geocode/regeo?output=JSON&location=${lng},${lat}&key=73653ae946f02b0cb1e8c35957f0bd12&radius=1000&extensions=all`)
            data = await response.json()
            const position = await data['regeocode']['addressComponent']['province']+data['regeocode']['addressComponent']['district']
            response = await fetch(`https://api.seniverse.com/v3/weather/now.json?key=SS8BQ7qc7w9j08lGG&location=${position}&language=zh-Hans&unit=c`)
            data = await response.json()
            setLocation(data.results[0])
            response = await fetch(`https://api.seniverse.com/v3/weather/hourly.json?key=SS8BQ7qc7w9j08lGG&location=${position}&language=zh-Hans&unit=c&start=0&hours=24`)
            data = await response.json()
            let temp6 = []
            for(let i=1;i<6;i++){temp6.push(data['results'][0]['hourly'][i]['temperature'])} 
            setTemperatures(temp6)
        }
        getTemp()
    },[])

    return (
        <div className="Weather-box">
            <header>
                <div>
                    <div style={{display: 'flex',alignItems: 'center'}}>
                    <div className='inline-block'>{location['location']['name']+'区'}</div>
                    <img src={area} alt="" width={'15px'} style={{marginLeft:'5px'}}/>
                    </div>
                    <div className='Temp'>{location['now']['temperature']}℃</div>
                    <div style={{background:'rgba(255,255,255,.25)',borderRadius:'10px',paddingLeft:'8px'}}>
                        {temperatures.map((v)=>{
                            return <span style={{marginRight:'8px'}}>{v}℃</span>
                        })}
                    </div>
                </div>
                <div className='Left'>
                    <div>{location['now']['text']}</div>
                    <div>湿度:{location['now']['humidity']}%</div>
                    <div>风速:{location['now']['wind_speed']}km/h</div>
                    <div>风向:{location['now']['wind_direction']}风</div>
                    <div>风力等级:{location['now']['wind_scale']}级</div>
                </div>
            </header>
            <footer>
                <div className="weatherFooterBox">
                    {/* <div style={styleWeatherimg} className='Weatherimg'></div> */}
                </div>
                
                
            </footer>
        </div>
    )
}





export default Weather;