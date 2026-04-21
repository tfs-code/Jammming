import React from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [
                {
                    name: "Example Track Name",
                    artist: "Example Artist Name",
                    album: "Example Track Album",
                    id: 1,
                },
                {
                    name: "Example Track Name 2",
                    artist: "Example Artist Name 2",
                    album: "Example Track Album 2",
                    id: 2,
                },
            ],
            playlistName: "Example Playlist",
            playlistTracks: [
                {
                    name: "Example Playlist Track Name 3",
                    artist: "Example Playlist Artist Name 3",
                    album: "Example Playlist Track Album 3",
                    id: 3,
                },
                {
                    name: "Example Playlist Track Name 4",
                    artist: "Example Playlist Artist Name 4",
                    album: "Example Playlist Track Album 4",
                    id: 4,
                },
            ],
        };
        this.addTrack = this.addTrack.bind(this);
    }

    addTrack(track) {
        const foundTrack = this.state.playlistTracks.find(
            (playlistTrack) => playlistTrack.id === track.id,
        );
        const newTrack = this.state.playlistTracks.concat(track);
        if (foundTrack) {
            console.log("Track already exists");
        } else {
            this.setState({ playlistTracks: newTrack });
        }
    }

    render() {
        return (
            <div>
                <h1>
                    Ja<span className="highlight">mmm</span>ing
                </h1>
                <div className="App">
                    {/* <!-- Add a SearchBar component --> */}
                    <SearchBar />
                    <div className="App-playlist">
                        {/* <!-- Add a SearchResults component --> */}
                        <SearchResults
                            searchResults={this.state.searchResults}
                            onAdd={this.addTrack}
                        />
                        {/* <!-- Add a playlist component --> */}
                        <Playlist
                            playlistName={this.state.playlistName}
                            playlistTracks={this.state.playlistTracks}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;

// FIND ERROR
