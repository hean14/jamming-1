import React, { useState } from "react";

//use the projects passing thoughts and saucy tango food order from codecademy for a reference point

function Playlist (props) {

    const { lists, removeSong } = props;

    const handleRemoveClick = () =>{
        removeSong(lists.id);
    }

    return(
        <div>
            <h3>{lists.name}</h3>
            <p>{lists.artist}</p>
            <button 
            aria-label="Remove Song"
            className="remove-button"
            onClick={handleRemoveClick}
            />
        </div>
    )
}

export default Playlist;