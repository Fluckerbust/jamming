import React from 'react';
import './App.css';

import {SearchBar} from '../search/searchbar/searchbar.js'
import {SearchResults} from '../search/searchresults/searchresults.js'
import {Playlist} from '../playlist/playlist.js'
import Spotify from '../util/Spotify.js';

class App extends React.Component {

  constructor(props) {
    super(props);
   
    this.state = {
    
  searchResults: [],
    
  playlistTracks: [],

  playlistName: 'the playlist'
}
  this.addTrack = this.addTrack.bind(this)
  this.removeTrack = this.removeTrack.bind(this)
  this.updatePlaylistName = this.updatePlaylistName.bind(this)
  this.savePlaylist = this.savePlaylist.bind(this)
  this.search = this.search.bind(this)
  }
 search(term) {
  Spotify.search(term).then(searchResults => {this.setState({searchResults: searchResults});});
  
 };
  addTrack(track) {
   let tracks = this.state.playlistTracks
        if (tracks.find(savedTrack => savedTrack.id === track.id)) {
          return alert("duplicate track");
    } else {
      tracks.push(track);
      this.setState({playlistTracks: tracks})
    }
  
}
  removeTrack(track) {
    let tracks = this.state.playlistTracks
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id)
    
    this.setState({playlistTracks: tracks})
  }

  updatePlaylistName(name){
    this.setState({playlistName: name});
  };

  savePlaylist() {
    
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New playlist',
        playlistTracks: []
      })
    })
  };

  render() {
   

    return (
    <div>
    <h1>Ja<span className="highlight">mmm</span>ing</h1>
    <div className="App">
      <SearchBar onSearch={this.search}/>
      <div className="App-playlist">
        <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
        <Playlist playlistName={this.state.playlistName} onNameChange={this.updatePlaylistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack}
        onSave={this.savePlaylist} />
      </div>
    </div>
  </div>
  );
  }
}


export default App;
