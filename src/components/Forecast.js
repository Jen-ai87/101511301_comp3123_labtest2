import React from 'react';
import './Forecast.css';

const Forecast = ({ forecast }) => {
  const dailyForecasts = [];
  const seenDates = new Set();
  forecast.list.forEach(item => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!seenDates.has(date) && dailyForecasts.length < 5) {
      seenDates.add(date);
      dailyForecasts.push(item);
    }
  });

  const getDayName = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="forecast-container">
      <h2 className="forecast-title">5-Day Forecast</h2>
      <div className="forecast-cards">
        {dailyForecasts.map((day, index) => (
          <div key={index} className="forecast-card">
            <div className="forecast-day">{getDayName(day.dt)}</div>
            <img
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
              className="forecast-icon"
            />
            <div className="forecast-temp">{Math.round(day.main.temp)}°C</div>
            <div className="forecast-description">{day.weather[0].main}</div>
            <div className="forecast-details">
              <div className="forecast-detail">
                <span className="detail-icon">💧</span>
                <span>{day.main.humidity}%</span>
              </div>
              <div className="forecast-detail">
                <span className="detail-icon">💨</span>
                <span>{day.wind.speed} km/h</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
