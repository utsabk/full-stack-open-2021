import React from 'react';

const Persons = ({ personsToDisplay }) =>
  personsToDisplay.map((person) => (
    <p key={person.id}>
      {person.name} {person.number}
    </p>
  ));

export default Persons;
