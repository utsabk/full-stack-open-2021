import React from 'react';

const Search = ({handleSearch}) =>{
    return(
        <>
        <label htmlFor="searchInput">find countries</label>
        <input id="searchInput" type="text" onChange={handleSearch} required/>
        </>
    )
}

export default Search;