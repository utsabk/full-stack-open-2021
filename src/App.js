import React, { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const [filter, setFilter] = useState([]);

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
