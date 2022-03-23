/** @jsxImportSource @emotion/react */

import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css'
import { useSearchParams } from 'react-router-dom';
import WeatherCard from '../components/WeatherCard';
import { useHorizontalScroll } from '../functions/HorizontalScroll';
import { BiSearch } from 'react-icons/bi'
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import useForecastSearch from '../hooks/useForecastSearch';
import Map from '../components/LeafletMap';
import ScrollContainer from 'react-indiana-drag-scroll';



function Search({ query }) {
  const randomCities = Array("London", "Madrid", "Paris", "Moscow, RU", "Berlin,DE" , "Hollywood", "Charlotte", "Mexico City", "Yakutsk,RU",
  "Naples", "Singapore,SG","Portland, OR", "New York", "Dallas");

  //randomCities[Math.floor(Math.random()*randomCities.length)]
  const [inputQuery, setInputQuery] = useState(query || "");
  const [searchParams, setSearchParams] = useSearchParams()

  const [forecasts, forecastCities, loading, error] = useForecastSearch(query);

  const scrollRef = useHorizontalScroll();
  return (
    <div className="main-container">
      <form className="cityEntry" onSubmit={(e) => {
        e.preventDefault();
        setSearchParams({ q: inputQuery })
      }}>
        <input className="searchbox" value={inputQuery} placeholder="Enter a city or ZIP code" onChange={e => setInputQuery(e.target.value)} />
        <button className="searchButton" type="submit"><BiSearch className="searchIcon" /></button>
      </form>
      {forecastCities.name &&
      <h2 className="cityEntryString">{`${forecastCities.name}, ${forecastCities.country} | 5-Day Forecast`}</h2> } 

      <div ref={scrollRef} className="scroll-wrapper" >

        {loading ? (
          <Spinner />
        ) : (
          <ScrollContainer className="scroll-container">
            <ul>
              {forecasts.map(forecast => <li className="card" key={forecast.dt}>{<WeatherCard date={forecast.dt} high={forecast.main.temp_max} low={forecast.main.temp_min} precipitation={forecast.pop} description={forecast.weather[0].description} icon={forecast.weather[0].icon} />}</li>)}
            </ul>
          </ScrollContainer>
        )}
        {error && <ErrorMessage/>}

      </div>

      {forecastCities.coord ? (
      <div className="map-container">
        <p className="api-credit">This site leverages the <a className="api-credit-link" href ="https://openweathermap.org/api" target="_blank">OpenWeatherMap API.</a></p>
        <Map coords={forecastCities.coord} q={inputQuery}/>
      </div>
    ): (<div></div>)
        }
    </div>
  );
}

export default Search;