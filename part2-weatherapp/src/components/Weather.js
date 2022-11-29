import axios from "axios";
import { useState, useEffect } from "react";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState([]);

  const weatherHook = () => {
    console.log("effect");
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=0bd4e4038e7c4967b2b205024220211&q=${capital}&aqi=no`
      )
      .then((response) => {
        console.log("promise fulfilled");
        setWeather(response.data);
      });
  };

  useEffect(weatherHook, [capital]);
  console.log("render", weather);

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <b> region:  </b>
      {weather && weather.location && weather.location.region}
      <div>
        <p>
        <b>temperature: </b>
        {weather && weather.current && weather.current.temp_c} Celsius
        </p>
        <p>
        <b>wind speed: </b>
        {weather && weather.current && weather.current.wind_mph} mph
        </p>
      </div>
    </div>
  );
};

export default Weather;
