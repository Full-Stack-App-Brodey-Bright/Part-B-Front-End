import React, { useState, useEffect } from "react";
import { updateTrack, playYtSearchTrack } from "./Player";
import Playlists from "./Playlists";
import PlaylistGet from "./PlaylistGet";
import removeSongRequest from "./RemoveSong";

export default function Track({
    title,
    artist,
    track,
    setUrl,
    trackUrl,
    playlistId,
    tracks,
}) {
    const [hidePlaylists, setHidePlaylists] = useState(true);

    function click() {
        removeSongRequest(tracks, track.url, playlistId, setUrl);
    }
    return (
        <div className="trackAndButton">
            <div
                className="playlistTrack"
                onClick={async () => {
                    if (trackUrl) {
                        await playYtSearchTrack(trackUrl), setUrl(trackUrl);
                    } else {
                        await updateTrack(track), setUrl(track.url);
                    }
                }}
            >
                <div className="trackInfo">
                    <h1>{title}</h1>
                    <h4>{artist}</h4>
                </div>
                <button onClick={click}>Remove</button>
            </div>
            <button
                className="addToPlaylistButton"
                onClick={() => {
                    setHidePlaylists(false);
                }}
            >
                Add To Playlist
            </button>
            <div hidden={hidePlaylists}>
                <PlaylistGet
                    title={title}
                    artist={artist}
                    trackUrl={trackUrl}
                />
            </div>
        </div>
    );
}
