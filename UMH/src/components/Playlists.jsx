import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import OnePlaylist from "./OnePlaylist";
import sp from "../assets/sp.svg";

// gets playlists from the api
export default function Playlists() {
    const [spinnerHidden, setSpinnerHidden] = useState(true);
    const [playlists, setPlaylists] = useState([]);
    async function getPlaylists() {
        setSpinnerHidden(false)
        let response = await fetch(
            "https://part-b-server.onrender.com/api/playlists",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            }
        ).then(setSpinnerHidden(false));
        const objResponse = await response.json();
        setSpinnerHidden(true)
        console.log(objResponse);
        setPlaylists(objResponse.playlists);
    }
    // if playlists exist stop sending requests
    useEffect(() => {
        getPlaylists();
    }, []);

    return (
        <div>
            <div className="PlaylistContainer">
            <img className="spinner" src={sp} hidden={spinnerHidden}></img>
                {playlists.map((playlist) => (
                    <OnePlaylist
                        title={playlist.title}
                        description={playlist.description}
                        creator={playlist.username}
                        tracks={playlist.tracks}
                        id={playlist._id}
                    />
                ))}
            </div>
        </div>
    );
}
