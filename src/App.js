import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Search from './components/Search';
import Country from './components/Country';

const App = () => {

  const[countries, setCountries] = useState([])
  const[filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then((response) => {

      // add id property to each object in the arry 
     const output =  response.data.map((country, index) =>  ({...country, id:index}))
    
     setCountries(output)

    });
  }, []);


  const handleSearch = (event) => {
    const filter = countries.filter((country) =>
      country.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredCountries(filter);
  };

  const handleClick = (country) => () => {
    setFilteredCountries([country]);
  }; 
  
  return (
    <>
      <Search handleSearch={handleSearch} />
      {filteredCountries.length === 1 ? <Country country={filteredCountries[0]} />
       : filteredCountries.length < 10 ? (
        filteredCountries.map((country) => (
          <p key={country.id}>{country.name}<button onClick={handleClick(country)}>Show</button></p>
        ))
      ) : (
        <p>Too many matches, specify another filter</p>
      )}
    </>
  );
};

export default App;
