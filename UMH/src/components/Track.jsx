import React, {useState} from "react";
import { updateTrack } from "./Player";
export default function Track ({title, artist, track, setUrl}) {
    return (
            <div>
                <h1>{title}</h1>
                <h2>{artist}</h2>
                <button onClick={async () => {await updateTrack(track), setUrl(track.url)}}>
                    Play Song
                </button>
            </div>
        );
    }

