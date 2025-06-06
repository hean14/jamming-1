import React, { useState } from "react";

function SearchBar (props) {

    //const [ accessToken ] = props;
    const [term, setTerm] = useState(''); //will be use for whats typed into search bar

    const handleSubmit = (e) =>{ //will be used for submitting the search term??????
        e.preventDefault();
    }

    async function search() {
        console.log('Search for ' + term);
    }

    return(
        <form onChange={handleSubmit}>
            <label htmlFor="searchBar"/>
            <input 
            id='searchBar' 
            value={term} 
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search for artist, song, or album"
            />
            <button type="submit" onClick={search}>Submit</button>
        </form>
    )
}

export default SearchBar;