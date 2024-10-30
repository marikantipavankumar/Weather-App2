import React,{ useState } from 'react';
import './index.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [backgroundClass, setBackgroundClass] = useState('default'); 

  const changeHandler = (e) => {
    setCity(e.target.value);
  }; 

  const submitHandler = (e) => {
    e.preventDefault();
    if (city.trim() === '') {
      setError('Please enter a city name');
      setWeatherData(null);
      setBackgroundClass('default');
      return;
    }

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c94b98f050ad1524f96fa067b2ea412c`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === '404') {
          setError('City not found. Please try again.');
          setWeatherData(null);
          setBackgroundClass('default');
          return;
        }  
        const kelvin = data.main.temp;
        const celsius = kelvin - 273.15;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const pressure = data.main.pressure;
        const weatherDescription = data.weather[0].description;
        const weatherMain = data.weather[0].main;  
        const visibility = data.visibility / 1000;

        setWeatherData({
          city: data.name,
          temperature: Math.round(celsius),
          humidity,
          windSpeed,
          pressure,
          description: weatherDescription,
          visibility,
        });

        
        switch (weatherMain.toLowerCase()) {
          case 'clear':
            setBackgroundClass('sunny');
            break;
          case 'clouds':
            setBackgroundClass('cloudy');
            break;
          case 'rain':
            setBackgroundClass('rainy');
            break;
          case 'snow':
            setBackgroundClass('snowy');
            break;
          default:
            setBackgroundClass('default');
        }

        setError('');
      })
      .catch((error) => {
        setError('An error occurred. Please try again.');
        setWeatherData(null);
        setBackgroundClass('default');
      });
  };

  return (
    <div className={`center ${backgroundClass}`}>  {}
      <div className='overlay'></div>
      <div className='card'>
        <div className='card-body'>
          <h2 className='card-title'>Weather-App</h2>
          <br />
          <h4>Know the Weather Details of Your City in One Step</h4>
          <br />
          <form onSubmit={submitHandler}>
            <input
              type='text'
              name='city'
              placeholder='Enter city name'
              value={city}
              onChange={changeHandler}
            />
            <br />
            <br />
            <input type='submit' value='Get Weather' />
          </form>

          {error && <h4 className='error'>{error}</h4>}

          {weatherData && (
            <div className='weather-info'>
              <h2>Weather in {weatherData.city}</h2>
              <p>Temperature: {weatherData.temperature} °C</p>
              <p>Humidity: {weatherData.humidity} %</p>
              <p>Wind Speed: {weatherData.windSpeed} m/s</p>
              <p>Pressure: {weatherData.pressure} hPa</p>
              <p>Visibility: {weatherData.visibility} km</p>
              <p>Condition: {weatherData.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
