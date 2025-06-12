import React, { useState } from "react";
import styles from './tracklist.css'
import { generateId } from "../utilities";
// plan for this page right now is to hard code in a list of 5 - 10 songs to serve as a basis for creating and testing a playlist function 
//updated comment do not need to actually do any hard coding here since we are passing in the data that will be recieved anyways it is porperly set up but may change due to trying to make it visualy more appealing.

function TrackList (props){

    const { songs, addSong, artists, songsID } = props;
    

    const handleAddClick = () =>{
        
        let artistName = artists[0].name;
        if(artists.length > 1){
        artistName = artistName + ' ft'
        }
        if(artists.length > 1){
            for(let i = 1; i<artists.length;){
                artistName = artistName + ' ' + artists[i];
            }
        }
        
        const listSong = {
            id: generateId(),
            songId: songsID,
            name: songs,
            artist: artistName
        }
        addSong(listSong);
    }

    

    if(artists.length > 1){
        
        return( 
        <div className={styles.card}>
            <div className={styles.detailsWrapper}>
                <h3>{songs}</h3>
                {artists.map((artist) => 
                <ul className={styles.details}>|{artist.name}</ul>
                )} 
                <button
                aria-label="add song"
                className="add-button"
                onClick={handleAddClick}/>
            </div>
        </div>
    )}

    else{
    return( 
        <div className={styles.card}>
            <div className={styles.detailsWrapper}>
                <h3>{songs}</h3>
                <p className={styles.details}>{artists[0].name}</p> 
                <button
                aria-label="add song"
                className="add-button"
                onClick={handleAddClick}/>
            </div>
        </div>
    )}    
    //might need to change the variables in the return but rn beleive that these variables are just for the addclick
}

export default TrackList;