/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style.css';

function Weather() {
  const [statesWeatherData, setStatesWeatherData] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [temp, setTemp] = useState('');
  const [showGoogleLink, setShowGoogleLink] = useState(false);

  useEffect(() => {
    // Load data from db.json
    axios.get('../../db.json').then(response => {
      setStatesWeatherData(response.data.statesWeatherData);
    });
  }, []);

  const handleStateSelect = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity('');
    setTemp('');
    setShowGoogleLink(false);
  };

  const handleCitySelect = (e) => {
    const selectedCityName = e.target.value;
    const selectedStateData = statesWeatherData.find(state => state.state === selectedState);
    const selectedCityWeatherData = selectedStateData?.cities.find(city => city.city === selectedCityName);
    
    if (selectedCityWeatherData && selectedCityWeatherData.temp) {
      setSelectedCity(selectedCityWeatherData.city);
      setTemp(selectedCityWeatherData.temp);
      setShowGoogleLink(false);
    } else {
      setSelectedCity(selectedCityName);
      setTemp('');
      setShowGoogleLink(true);
    }
  };

  const searchOnGoogle = () => {
    if (selectedCity) {
      const searchQuery = `temperature of ${selectedCity} city`;
      window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
    }
  };

  return (
    <div className="weather">
      <div className="weather-app-container">
        <div className="weather-app-content">
          <h1 className="weather-app-heading">Weather Checking</h1>
          <div className="weather-app-select">
            <select
              onChange={handleStateSelect}
              className="weather-app-select-dropdown"
              value={selectedState}
            >
              <option value="" disabled>Select State</option>
              {statesWeatherData.map((state) => (
                <option key={state.state} value={state.state}>
                  {state.state}
                </option>
              ))}
            </select>
            {selectedState && (
              <select
                onChange={handleCitySelect}
                className="weather-app-select-dropdown"
                value={selectedCity}
              >
                <option value="" disabled>Select City</option>
                {statesWeatherData
                  .find(state => state.state === selectedState)
                  ?.cities.map((city) => (
                    <option key={city.city} value={city.city}>
                      {city.city}
                    </option>
                  ))}
              </select>
            )}
          </div>
          {showGoogleLink && (
            <p className="weather-app-error">
              Oops!! Data not available,{' '} click here... <br />  
              <span onClick={searchOnGoogle} className="weather-app-search-link">
                Search on Google
              </span>
            </p>
          )}
          {temp && (
            <div className="weather-app-info">
              <h2 className="weather-app-city">{selectedCity}</h2>
              <p className="weather-app-temperature">Temperature: {temp}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Weather;
