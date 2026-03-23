import axios from "axios";
import { useState, useEffect} from 'react';


const Weather =({capital}) => {

    const api_key =import.meta.env.VITE_SOME_KEY
    const [weather,setWeather] = useState(null)


    useEffect(() => {
        if(!capital) return

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`

        axios.get(url)
        .then( response => {
            setWeather(response.data)
        })
    },[capital])

    // once it fetched the weather...
     if (!weather) return <div>loading weather.....wait please</div>


     const iconUrl =  `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

      return (
        <div>
            <h3>Weather in : {capital}</h3>
            <p>Tempeture: {weather.main.temp} celsius</p>
            <img src={iconUrl} width="100px" />
            <p>Winds {weather.wind.speed} m/s</p>
        </div>
      )


}


export default Weather
