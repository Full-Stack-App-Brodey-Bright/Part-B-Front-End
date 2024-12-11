import React, {useState, useEffect} from "react";
import { updateTrack } from "./Player";

let thisTrack =  document.getElementsByClassName('playlistTrack')
export default function Track ({title, artist, track, setUrl}) {
    return (
            <div className="playlistTrack" onClick={async () => {await updateTrack(track), setUrl(track.url)}}>
                <div className="trackInfo">
                <h1>{title}</h1>
                <h4>{artist}</h4>
                </div>
            </div>
        );
    }

