import React, {useState} from "react";
import Playlists from "./Playlists";
import CreatePlaylist from "./CreatePlaylist";

export default function Library() {
    const [hidden, setHidden] = useState(true)
    return (
        <div className="Library">
        <div hidden={hidden}>
            <CreatePlaylist/>
        </div>
        <h1>Library</h1>
        <div
            className="PlaylistDash"
            onClick={() => {
                ;
            }}
        >
            <div onClick={() => {setHidden(false)}} style={{display : 'flex', flexDirection : 'row', justifyContent : 'space-between', width : '19vw'}} className="PlaylistDashInfo">
                <h1>Create New Playlist</h1>
                <h1 >+</h1>
            </div>

        </div>
        <Playlists all={false}/>
    </div>
    )
}