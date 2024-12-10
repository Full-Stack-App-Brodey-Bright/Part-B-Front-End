import React from "react";
import Playlists from "./Playlists";

export default function Library() {
    return (
        <div className="Library">
        <h1>Library</h1>
        <div
            className="PlaylistDash"
            onClick={() => {
                location.href = `/playlists`;
            }}
        >
            <div style={{display : 'flex', flexDirection : 'row', justifyContent : 'space-between', width : '19vw'}} className="PlaylistDashInfo">
                <h1>Create New Playlist</h1>
                <h1 >+</h1>
            </div>

        </div>
        <Playlists />
    </div>
    )
}