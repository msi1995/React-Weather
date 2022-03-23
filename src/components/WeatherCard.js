import React from 'react';
import { WiRain } from 'react-icons/wi'

function WeatherCard(props) {
    const dateObject = new Date(props.date*1000);
    
    const date = dateObject.toLocaleString("en-US", {weekday: "long", hour:"numeric"})

    var high = parseInt(props.high);
    var low = parseInt(props.low);
    var precip = parseFloat(props.precipitation) * 100;
    precip = Math.round(precip * 100) / 100
    var image = `http://openweathermap.org/img/wn/${props.icon}@2x.png`
    return (
        <div className="card-data">
            <h2>{date}</h2>
            <img className="icon" src={image}></img>
            <h3 className="weather-descrip">{props.description}</h3>
            <div className="weather-temps">
                <span className="temp-value">High: {high}</span>
                <span className="temp-value">Low: {low}</span>
            </div>
                <div className="rain">
                <h2 className="weather-precip"><WiRain className="rain-icon"/>{precip}%</h2>
                </div>
        </div>
    )
}

export default WeatherCard