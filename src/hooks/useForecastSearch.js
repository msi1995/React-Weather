import { useState, useEffect } from 'react';

function useForecastSearch(query){

    const [ forecasts, setForecasts ] = useState([])
    const [ forecastCities, setForecastCity ] = useState([])
    const [ cityString, setCityString ] = useState("")
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ map, setMap] = useState(false)

    useEffect( () => {
    let ignore = false;
    const controller = new AbortController();
        async function fetchWeatherResults(){
        let responseBody = {};
        setLoading(true);
        try{
            const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${query},US&appid=6fb58c7d94e824bea949fa3438825ce8&units=imperial`,
            { signal: controller.signal }
            );
            responseBody = await response.json();
            } catch (e) {
            if (e instanceof DOMException){
                console.log("== HTTP request cancelled")
            } else {
                setError(true);
                throw e;
            }
            }
            if(responseBody.cod != 200){
            setError(true)
            setCityString("")
            setLoading(false);
            setForecasts([])
            setForecastCity([]);
            }

            if(!ignore && responseBody.cod == 200){
            setError(false);
            setCityString(`${query} 5-Day Forecast`)
            setForecasts(responseBody.list || []);
            setForecastCity(responseBody.city || []);
            setLoading(false);
            }

            
        }

        if(query){
        fetchWeatherResults()
        }
        
        return () => {
        ignore = true;
        }
    }, [ query ]);

    return [forecasts, forecastCities, loading, error]
}


export default useForecastSearch