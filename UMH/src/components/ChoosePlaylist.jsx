import React, { useState } from "react";
import AddSong from "./AddSong";

// individual playlist boxes when displaying multiple playlists
export default function ChoosePlaylist({title, tracks, trackTitle, trackArtist, trackUrl, id}) {

    function click() {
        AddSong(
            tracks,
            trackTitle,
            trackArtist,
            trackUrl,
            id
        )
    }
        return (
            <div
                className="playlistOption"
                onClick={click}
            >
                <div className="playlistOptionInfo">
                    <h1>{title}</h1>
                </div>
            </div>
        );
    }
