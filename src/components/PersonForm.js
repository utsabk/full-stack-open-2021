import React from 'react';

const PersonForm = (props) => {
  const {
    addNewName,
    newName,
    newNumber,
    handleNewName,
    handleNewNumber,
  } = props;

  return (
    <form onSubmit={addNewName}>
      <div>
        <label htmlFor="nameInput">name:</label>{' '}
        <input
          type="text"
          id="nameInput"
          value={newName}
          onChange={handleNewName}
          required
        />
      </div>
      <div>
        <lavbel htmlFor="numberInput">number:</lavbel>{' '}
        <input
          type="number"
          id="numberInput"
          value={newNumber}
          onChange={handleNewNumber}
          required
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
