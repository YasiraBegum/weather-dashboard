import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const getWeather = async () => {
    try {
      setError('');
      const res = await fetch(`http://localhost:5000/weather/${city}`);
      const data = await res.json();

      if (data.error) {
        setError('City not found. Please try again.');
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError('Unable to fetch weather data.');
      setWeather(null);
    }
  };

  return (
    <div className="dashboard">
      <h1>Weather Dashboard</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Get Weather</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && weather.main && (
        <div className="weather-container">
          <div className="weather-card">
            <h2>{weather.name}</h2>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon"
            />
            <p><strong>Temperature:</strong> {weather.main.temp} °C</p>
            <p><strong>Condition:</strong> {weather.weather[0].description}</p>
          </div>

          <div className="info-grid">
            <div className="info-box">
              <h3>Humidity</h3>
              <p>{weather.main.humidity}%</p>
            </div>
            <div className="info-box">
              <h3>Wind Speed</h3>
              <p>{weather.wind.speed} m/s</p>
            </div>
            <div className="info-box">
              <h3>Pressure</h3>
              <p>{weather.main.pressure} hPa</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
