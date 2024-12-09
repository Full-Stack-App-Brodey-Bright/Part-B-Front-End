import React, {useState} from "react";
import { updateTrack } from "./Player";

let thisTrack =  document.getElementsByClassName('playlistTrack')
export default function Track ({title, artist, track, setUrl, playingUrl}) {
    const [color, setcolor] = useState('grey')

    
    return (
            <div style={{backgroundColor : color}} className="playlistTrack">
                <div className="trackInfo">
                <h1>{title}</h1>
                <h4>{artist}</h4>
                </div>
                <button onClick={async () => {await updateTrack(track), setUrl(track.url)}}>
                    Play Song
                </button>
            </div>
        );
    }

