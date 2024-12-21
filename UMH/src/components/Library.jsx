import React, {useEffect, useState} from "react";
import Playlists from "./Playlists";
import CreatePlaylist from "./CreatePlaylist";

// displays users playlists and liked playlists
export default function Library() {
    const [hidden, setHidden] = useState(true)

    // checks if user is on the mobile library page and displays mobile version
    async function libraryWait() {
        let lib = await document.getElementsByClassName('Library')[0]
        if (location.href == `${import.meta.env.VITE_URL}/library`) {
            await lib
            lib.style.display = 'flex'
        }
    }

    useEffect(() => {
        libraryWait()
    }, [])

    return (
        <div className="Library">
        <div hidden={hidden}>
            <CreatePlaylist/>
        </div>
        <h1 className="LibraryTitle">Library</h1>
        <div
            className="PlaylistDash"
            onClick={() => {
                ;
            }}
        >
            <div onClick={() => {setHidden(!hidden)}} style={{display : 'flex', flexDirection : 'row', justifyContent : 'space-between', width : '95vw'}} className="PlaylistDashInfo">
                <h1>Create New Playlist</h1>
                <h1 >+</h1>
            </div>

        </div>
        <Playlists all={false} searchQuery={''}/>
    </div>
    )
}