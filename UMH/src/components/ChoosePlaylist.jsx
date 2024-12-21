import React, { useState } from "react";
import addSongRequest from "./AddSong";

// individual playlist boxes when displaying multiple playlists

// this is used when adding a track to a playlist. It displays users owned playlists to choose from
export default function ChoosePlaylist({title, tracks, trackTitle, trackArtist, trackUrl, id}) {

    // sends data to addsong
    function click() {
        addSongRequest(
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
