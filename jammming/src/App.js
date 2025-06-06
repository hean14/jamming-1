import styles from './App.module.css';
import TrackList from './components/tracklist/tracklist';
import SearchBar from './components/searchBar/searchBar';
import Playlist from './components/playlist/playlist';
import React, { useState, useEffect } from 'react';

// for right now just gonna hardcode some songs into the playlist just to mess around with the look
const CLIENT_ID="7675a593720a4e9f97bc02eb0558f76f";
const CLIENT_SECRET="1e8f188f803d482892c6aa75e50650a5";

function App() {
  //the statement below is for adding songs to a playlist from the results page rn its just gonna be hard coded until i start messing with api
  const [accessToken, setAccessToken] =useState('');

  useEffect(() =>{
    //API Access Token
    var authParameters ={
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }

    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token)) // this line is where we give access to spotify
  }, [])

  const [song, setSong] =useState([
    {
      id: 1,
      name: 'Till I Collapse',
      artist: 'eminem',
    },
    {
      id:2,
      name: 'kryptonite',
      artist: 'three doors down',
    },
    {
      id:3,
      name: 'Johnny Ps Caddy',
      artist: 'Benny the Butcher, J. Cole',
    }
  ])

  const [list, setList] = useState([]); // will be used to for createing the playlist?
  const [name, setName] = useState('');

  const handleNameChange = (event) =>{
    setName(event.target.value);
  }

  const addSong = (songToAdd) =>{
    setList((prev) => [songToAdd, ...prev]);
  }

  const removeSong = (songToRemove) =>{
    setList((list) => 
      list.filter((lists) => lists.id !== songToRemove)
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className={styles.searchbar}>
          <SearchBar accessToken={accessToken}/>
        </div>
        <div className={styles.body}>
          <div className={styles.group1}>
            <h1>Results</h1>
          {song.map((songs) => (
            <TrackList key={songs.id} songs={songs} addSong={addSong} />
          ))}
        </div>
        <div className={styles.playlist}>
          <input 
            type='text'
            aria-label='playlist name'
            placeholder='playlist name'
            value={name}
            onChange={handleNameChange}
            />
          {list.map((lists) =>(
            <Playlist lists={lists} removeSong={removeSong}/>
          ))}
        </div>
       </div>
      </header>
    </div>
  );
}

export default App;
