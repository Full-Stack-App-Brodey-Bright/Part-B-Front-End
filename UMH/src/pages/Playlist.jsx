import { useState, React, useEffect } from "react";
import Cookies from 'js-cookie'
import PlaylistDetails from "../components/PlaylistDetails";
import { queueCreate } from "../components/Player";



export default function Playlist({playlist, setPlaylist, setUrl}) {
    
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
            await setPlaylist(objResponse.playlists)
            
        }
        useEffect(() => {
            getPlaylist()
            
        }, []);
        useEffect(() => {
            queueCreate(playlist)
            
        }, [playlist]);
        
    return (
        <div>
            {
                playlist.map((details) => <PlaylistDetails setUrl={setUrl} title={details.title} description={details.description} creator={details.creator} tracks={details.tracks} id={details._id} />)
            }
        </div>
    )
}