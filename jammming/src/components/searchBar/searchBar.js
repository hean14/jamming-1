import React, { useState } from "react";

function SearchBar (props) {

    //const [ accessToken ] = props;
    const [term, setTerm] = useState(''); //will be use for whats typed into search bar

    const handleSubmit = (e) =>{ //will be used for submitting the search term??????
        e.preventDefault();
        props.search(term);
    }

    const handleTermChange = (e) =>{
        setTerm(e.target.value);
    }

    return(
        <form  onSubmit={handleSubmit}>
            <label htmlFor="searchBar"/>
            <input 
            id='searchBar' 
            type='text'
            value={term} 
            onChange={handleTermChange}
            placeholder="Search for artist, song, or album"
            />
            <input type='submit' value='add' />
        </form>
    )
}

export default SearchBar;