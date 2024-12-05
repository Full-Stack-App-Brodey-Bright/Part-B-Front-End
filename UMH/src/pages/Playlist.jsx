import { useState } from "react";
import Cookies from 'js-cookie'
import PlaylistDetails from "../components/PlaylistDetails";

export default function Playlists() {
    const [playlist, setPlaylist] = useState([])
        async function getPlaylist() {
            let response = await fetch(
                `https://part-b-server.onrender.com/api/playlists?id=${window.location.pathname.split('/')[2]}`,
                {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${Cookies.get("token")}`,
                    },
                }
            );
            const objResponse = await response.json()
            console.log(objResponse.playlists[0].tracks)
            setPlaylist(objResponse.playlists)
        }
        // if playlists exist stop sending requests
        if (!playlist.length > 0) {
            getPlaylist()
        }
    return (
        <div>
            {
                playlist.map((details) => <PlaylistDetails title={details.title} description={details.description} creator={details.creator} tracks={details.tracks} id={details._id} />)
            }
        </div>
    )
}