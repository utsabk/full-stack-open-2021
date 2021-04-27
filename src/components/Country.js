import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Weather from './Weather'

const Country = ({ country }) => {

    const[weather,setWeather] = useState({})

    useEffect(() =>{
        axios
        .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`)
        .then(response => {
            console.log('weather reponse:',response.data)
            setWeather(response.data.current)
        })
    }, [])

  return (
    <>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map((lan) => (
          <li key={lan.nativeName}>{lan.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt="flag" width="10%" height="10%" />
      <h2>Weather in {country.capital}</h2>
      <Weather weather={weather}/>
    </>
  );
};

export default Country;
