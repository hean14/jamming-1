import React, { useState } from "react";
import styles from './tracklist.css'
import { generateId } from "../utilities";
// plan for this page right now is to hard code in a list of 5 - 10 songs to serve as a basis for creating and testing a playlist function 
//updated comment do not need to actually do any hard coding here since we are passing in the data that will be recieved anyways it is porperly set up but may change due to trying to make it visualy more appealing.

function TrackList (props){

    const { songs, addSong } = props;
    

    const handleAddClick = () =>{
        const listSong = {
            id: generateId(),
            songId: songs.id,
            name: songs.name,
            artist: songs.artist
        }
        addSong(listSong);
    }

    return(
        <div className={styles.card}>
            <div className={styles.detailsWrapper}>
                <h3>{songs.name}</h3>
                <p className={styles.details}>{songs.artist}</p>
                <button
                aria-label="add song"
                className="add-button"
                onClick={handleAddClick}/>
            </div>
        </div>
    )    

}

export default TrackList;