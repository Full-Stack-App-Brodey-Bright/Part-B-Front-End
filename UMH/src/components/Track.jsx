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
    isOwner,
}) {
    const [hidePlaylists, setHidePlaylists] = useState(true);

    // sends track to removesong component when removing
    function click() {
        removeSongRequest(tracks, track.url, playlistId, setUrl);
    }
    return (
        <div className="trackAndButton">
            <div
                className="playlistTrack"
                onClick={async () => {
                    // plays the track when clicked. Also checks if the track is a searched track (not in db) and plays directly from the frontend
                    if (trackUrl) {
                        await playYtSearchTrack(trackUrl), setUrl(trackUrl);
                    } else {
                        await updateTrack(track), await setUrl(track.url);
                    }
                }}
            >
                <div className="trackInfo">
                    <h1>{title}</h1>
                    <h4>{artist}</h4>
                </div>
                {/* hides remove buttons if user is not the owner */}
                <button hidden={!isOwner} onClick={click}>
                    Remove
                </button>
            </div>
            <button
                // toggles playlist display when clicked
                className="addToPlaylistButton"
                onClick={() => {
                    setHidePlaylists(!hidePlaylists);
                }}
            >
                Add To Playlist
            </button>
            <div hidden={hidePlaylists}>
            {/* shows playlists to add the track to */}
                <PlaylistGet
                    title={title}
                    artist={artist}
                    trackUrl={trackUrl}
                />
            </div>
        </div>
    );
}
