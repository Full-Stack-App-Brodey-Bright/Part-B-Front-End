import React, {useState, useEffect} from "react";
import { updateTrack, playYtSearchTrack } from "./Player";
import Playlists from "./Playlists";

let thisTrack =  document.getElementsByClassName('playlistTrack')
export default function Track ({title, artist, track, setUrl, trackUrl}) {
    const [showPlaylists, setShowPlaylists] = useState(false)
    function ChoosePlaylist() {
        if (showPlaylists == true) {
        return <div></div>
        }
    }
    return (
        <div className="trackAndButton">
            <div className="playlistTrack" onClick={async () => {if (trackUrl) {await playYtSearchTrack(trackUrl), setUrl(trackUrl)}else {await updateTrack(track), setUrl(track.url)}}}>
                <div className="trackInfo">
                <h1>{title}</h1>
                <h4>{artist}</h4>
                </div>
            </div>
            <button className="addToPlaylistButton" onClick={() => {setShowPlaylists(true)}} >
                    Add To Playlist
                </button>
                {ChoosePlaylist()}
        </div>
        );
    }

