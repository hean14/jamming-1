import styles from './App.module.css';
import TrackList from './components/tracklist/tracklist';
import SearchBar from './components/searchBar/searchBar';
import Playlist from './components/playlist/playlist';
import React, { useState } from 'react';

// for right now just gonna hardcode some songs into the playlist just to mess around with the look

function App() {
  //the statement below is for adding songs to a playlist from the results page rn its just gonna be hard coded until i start messing with api
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
          <SearchBar/>
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
