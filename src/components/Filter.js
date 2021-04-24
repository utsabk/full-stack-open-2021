import React from 'react';

const Filter = ({ handleSearch }) => {
  return (
    <>
      <label htmlFor="searchInput"> filter shown with: </label>
      <input id="searchInput" onChange={handleSearch} />
    </>
  );
};
export default Filter;
