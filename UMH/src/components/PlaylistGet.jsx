import sp from "../assets/sp.svg";
import Cookies from 'js-cookie'
import ChoosePlaylist from "./ChoosePlaylist";
import React, {useState, useEffect} from "react";


export default function PlaylistGet({title, artist, trackUrl}) {
const [spinnerHidden, setSpinnerHidden] = useState(true);
const [playlists, setPlaylists] = useState([]);
    async function getPlaylists() {
        setSpinnerHidden(false)
        let response = await fetch(
            `https://part-b-server.onrender.com/api/playlists?all=${false}&searchQuery=`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            }
        ).then(setSpinnerHidden(false));
        const objResponse = await response.json();
        setSpinnerHidden(true)
        setPlaylists(await objResponse.playlists);
    }
    useEffect(() => {
        getPlaylists();
    }, []);
    return (
        <div className="playlistOptionContainer">
        <img className="spinner" src={sp} hidden={spinnerHidden}></img>
            {playlists.map((playlist) => {
            return <ChoosePlaylist title={playlist.title} creator={playlist.creator} id={playlist._id} key={playlist._id} tracks={playlist.tracks} trackTitle={title} trackArtist={artist} trackUrl={trackUrl}/>
            })}
        </div>
    )
}