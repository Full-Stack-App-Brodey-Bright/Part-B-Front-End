import Cookies from "js-cookie";
import { componentDidMount, useState } from "react";
import OnePlaylist from "../components/OnePlaylist";

// gets playlists from the api
export default function Playlists() {
    const [playlists, setPlaylists] = useState([])
        async function getPlaylists() {
            let response = await fetch(
                "https://part-b-server.onrender.com/api/playlists",
                {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${Cookies.get("token")}`,
                    },
                }
            );
            const objResponse = await response.json()
            console.log(objResponse)
            setPlaylists(objResponse.playlists)
        }
        // if playlists exist stop sending requests
        if (!playlists.length > 0) {
            getPlaylists()
        }

    return (
        <div>
            <h1>Playlists</h1>
            <div className="PlaylistContainer">
                {
                    playlists.map((playlist) => <OnePlaylist title={playlist.title} description={playlist.description} creator={playlist.creator} tracks={playlist.tracks} id={playlist._id} />)
                }
            </div>
        </div>
    );
}
