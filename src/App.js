import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const [filter, setFilter] = useState([]);

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then((response) => {
      const persons = response.data;
      setPersons(persons);
    });
  }, []);
  


  const addNewName = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    setPersons(persons.concat(personObject));
    setNewName('');
    setNewNumber('');
  };

  const handleNewName = (event) => {
    const name = event.target.value;
    persons.find((person) => person.name === name)
      ? window.confirm(`${name} is already added to phonebook`)
      : setNewName(name);
  };

  const handleNewNumber = (event) => {
    const number = event.target.value;
    setNewNumber(number);
  };

  const handleSearch = (event) => {
    const search = event.target.value.toLowerCase();

    console.log('Serach text', search);

    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(search)
    );

    console.log('filteredPersons', filteredPersons);

    setFilter(filteredPersons);
  };

  const personsToDisplay = filter.length < 1 ? persons : filter;

  return (
    <>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch} />
      <h2>add a new</h2>
      <PersonForm
        addNewName={addNewName}
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons personsToDisplay={personsToDisplay} />
    </>
  );
};

export default App;
