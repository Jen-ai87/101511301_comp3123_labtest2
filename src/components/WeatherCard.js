import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ weather }) => {
  const { main, weather: weatherInfo, name, sys, wind } = weather;
  const iconUrl = `http://openweathermap.org/img/wn/${weatherInfo[0].icon}@4x.png`;
  
  // Get current date and day
  const date = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  return (
    <div className="weather-card">
      <div className="main-weather">
        <div className="date-location">
          <div className="date">{formattedDate}</div>
          <div className="location">{name}, {sys.country}</div>
        </div>
        
        <div className="temperature-section">
          <img src={iconUrl} alt={weatherInfo[0].description} className="weather-icon-large" />
          <div className="temperature">
            {Math.round(main.temp)}°C
          </div>
        </div>
        
        <div className="weather-description">
          {weatherInfo[0].main}
        </div>
      </div>
      
      <div className="weather-details">
        <div className="detail-item">
          <div className="detail-label">Feels Like</div>
          <div className="detail-value">{Math.round(main.feels_like)}°C</div>
        </div>
        
        <div className="detail-item">
          <div className="detail-label">Humidity</div>
          <div className="detail-value">{main.humidity}%</div>
        </div>
        
        <div className="detail-item">
          <div className="detail-label">Wind Speed</div>
          <div className="detail-value">{wind.speed} km/h</div>
        </div>
        
        <div className="detail-item">
          <div className="detail-label">Pressure</div>
          <div className="detail-value">{main.pressure} mb</div>
        </div>
        
        <div className="detail-item">
          <div className="detail-label">Min Temp</div>
          <div className="detail-value">{Math.round(main.temp_min)}°C</div>
        </div>
        
        <div className="detail-item">
          <div className="detail-label">Max Temp</div>
          <div className="detail-value">{Math.round(main.temp_max)}°C</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
