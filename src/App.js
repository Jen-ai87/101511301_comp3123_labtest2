import React, { useState, useEffect } from 'react';
import './App.css';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import Forecast from './components/Forecast';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [city, setCity] = useState('Toronto');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = 'bd5e378503939ddaee76f12ad7a97608';

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch current weather
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      
      if (!weatherResponse.ok) {
        throw new Error('City not found');
      }
      
      const weatherData = await weatherResponse.json();
      setWeatherData(weatherData);

      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      
      if (forecastResponse.ok) {
        const forecastData = await forecastResponse.json();
        setForecastData(forecastData);
      }
      
      setCity(cityName);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchCity) => {
    fetchWeather(searchCity);
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="app-title">Weather Forecast</h1>
        
        <SearchBar onSearch={handleSearch} />
        
        {loading && <div className="loading">Loading...</div>}
        
        {error && <div className="error">{error}</div>}
        
        {weatherData && !loading && (
          <>
            <WeatherCard weather={weatherData} />
            {forecastData && <Forecast forecast={forecastData} />}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
