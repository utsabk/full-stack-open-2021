import React, { useEffect, useState } from 'react';
import phonebookSevices from './services/phonebook';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Person from './components/Person';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const [filter, setFilter] = useState([]);

  const [notification, setNotification] = useState(null);
  const [isBackgroundGreen, setIsBackgroundGreen] = useState(true);

  useEffect(() => {
    phonebookSevices.getAll().then((persons) => setPersons(persons));
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
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== duplicateObj.id ? person : returnedPerson
              )
            );
            setIsBackgroundGreen(isBackgroundGreen);
            setNotification(`Updated number ${newNumber}`);
            setTimeout(() => {
              setNotification(null);
            }, 2000);
            setNewName('');
            setNewNumber('');
          })
          .catch((error) => {
            setIsBackgroundGreen(!isBackgroundGreen);
            setNotification(
              `Information of ${newName} has already been removed from server`
            );
            setPersons(
              persons.filter((person) => person.id !== duplicateObj.id)
            );
            setTimeout(() => {
              setNotification(null);
            }, 2000);
            setNewName('');
            setNewNumber('');
            console.log('Error while updating');
          });
      } else {
        setNewName('');
        setNewNumber('');
        setIsBackgroundGreen(!isBackgroundGreen);
        setNotification('Contact replacement aborted');
        setTimeout(() => {
          setNotification(null);
        }, 2000);

        console.log('Contact replacement aborted');
      }
    } else {
      phonebookSevices.create(personObject).then((returnedObject) => {
        setPersons(persons.concat(returnedObject));
        setIsBackgroundGreen(isBackgroundGreen);
        setNotification(`Added ${newName}`);
        setTimeout(() => {
          setNotification(null);
        }, 2000);

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

  const handleDelete = (id) => () => {
    phonebookSevices
      .remove(id)
      .then((response) => {
        if (response) {
          setPersons(persons.filter((person) => person.id !== id));
        }
      })
      .catch((err) => {
        console.log('Error while deleting:-', err);
        setIsBackgroundGreen(!isBackgroundGreen)
        setNotification(`Error while deleting:-', ${err}`);
        setTimeout(() => {
          setNotification(null);
        }, 2000);
      });
  };

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={notification} background={isBackgroundGreen} />
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
      {personsToDisplay.map((person) => (
        <Person
          key={person.id}
          person={person}
          handleDelete={handleDelete(person.id)}
        />
      ))}
    </>
  );
};

export default App;
