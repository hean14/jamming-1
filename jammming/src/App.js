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

  const [song, setSong] =useState([])// used to show the returned for searched songs
  const [list, setList] = useState([]); // used to for createing the playlist
  const [playlistName, setPlaylistName] = useState('');// playlist name

  const handleNameChange = (event) =>{
    setPlaylistName(event.target.value);
  }

  const addSong = (songToAdd) =>{
    setList((prev) => [songToAdd, ...prev]);
  }

  const removeSong = (songToRemove) =>{
    setList((list) => 
      list.filter((lists) => lists.id !== songToRemove)
    );
  }

  async function search(terms) {
    console.log('Search for ' + terms);

    // get request using serch for artist id
    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }
    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + terms + '&type=artist', searchParameters)
    .then(response => response.json())
    .then(data => {return data.artists.items[0].id})
    //with artist id grab songs or albums
    var tracks = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/top-tracks?market=US', searchParameters)
    .then(response => response.json())
    .then(data => {
      console.log(data.tracks)
      setSong(data.tracks);
    });
    
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className={styles.searchbar}>
          <SearchBar search={search}/>
        </div>
        <div className={styles.body}>
          <div className={styles.group1}>
            <h1>Results</h1>
          {song.map((songs) => (
            <TrackList songsID={songs.id} songs={songs.name} artists={songs.artists} addSong={addSong} />
            
          ))}
        </div>
        <div className={styles.playlist}>
          <input 
            type='text'
            aria-label='playlist name'
            placeholder='playlist name'
            value={playlistName}
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
