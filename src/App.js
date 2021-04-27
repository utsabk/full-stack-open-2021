import React, { useEffect, useState } from 'react';
import phonebookSevices from './services/phonebook'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Person from './components/Person';

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const [filter, setFilter] = useState([]);

  useEffect(() => {
    phonebookSevices.getAll()
    .then(persons => setPersons(persons));
  }, []);
  


  const addNewName = (event) => {
    event.preventDefault();
    const duplicateObj = persons.find((person) => person.name === newName);
    const personObject = { name: newName, number: newNumber };

    if (duplicateObj) {
      if (
        window.confirm(
          `${duplicateObj.name} is already added to phonebook, replace with a new number?`
        )
      ) {
        phonebookSevices
          .update(duplicateObj.id, personObject)
          .then((returnedPerson) =>
            setPersons(
              persons.map((person) =>
                person.id !== duplicateObj.id ? person : returnedPerson
              )
            )
          );
      } else {
        setNewName('');
        setNewNumber('');
      }
    } else {
      phonebookSevices.create(personObject).then((returnedObject) => {
        setPersons(persons.concat(returnedObject));
        setNewName('');
        setNewNumber('');
      });
    }
  };

  const handleNewName = (event) => {
    const name = event.target.value;
    setNewName(name);
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

  const handleDelete = (id)=> () =>{
    phonebookSevices.remove(id).then(response => {
      if(response){
        setPersons(persons.filter(person => person.id !== id))
      }  
    }).catch(error =>{
      console.log('error:',error)
    })
  }

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
      {personsToDisplay.map(person => <Person key={person.id} person={person} handleDelete={handleDelete(person.id)} />)}
    </>
  );
};

export default App;
