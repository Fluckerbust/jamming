import React from 'react';
import './searchresults.css'
import {TrackList} from '../../tracklist/trackList.js'

class SearchResults extends React.Component {
  

    render() {
      
      return <div className="SearchResults">
      <h2>Results</h2>
      <TrackList onAdd={this.props.onAdd} isRemoval={false} tracks={this.props.searchResults} />
    </div>;
    }
  }
  
  export {SearchResults};