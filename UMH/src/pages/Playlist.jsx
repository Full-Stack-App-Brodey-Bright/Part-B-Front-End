import { useState, React, useEffect } from "react";
import Cookies from "js-cookie";
import PlaylistDetails from "../components/PlaylistDetails";
import { queueCreate } from "../components/Player";
import AddSong from "../components/AddSong";

export default function Playlist({ playlist, setPlaylist, setUrl, url }) {
    const [hidden, setHidden] = useState(true)
    async function addTrack() {
        let response = await fetch(
            `https://part-b-server.onrender.com/api/playlists?id=${
                window.location.pathname.split("/")[2]
            }`,
            {
                method: "PUT",
                body: JSON.stringify({}),
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                    "Content-Type": "application/json",
                },
            }
        );
        const objResponse = await response.json();
    }
    async function getPlaylist() {
        let response = await fetch(
            `https://part-b-server.onrender.com/api/playlists?id=${
                window.location.pathname.split("/")[2]
            }`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            }
        );
        const objResponse = await response.json();
        console.log(objResponse.playlists[0].tracks);
        await setPlaylist(objResponse.playlists);
    }
    useEffect(() => {
        getPlaylist();
    }, []);
    useEffect(() => {
        queueCreate(playlist);

    }, [playlist]);


    return (
        <div>
            <div hidden={hidden}><AddSong tracks={async () => {
                return(await playlist[0].tracks )
                
                }}/></div>
            <div className="test">
                {playlist.map((details) => (
                    <PlaylistDetails
                        setUrl={setUrl}
                        title={details.title}
                        description={details.description}
                        creator={details.creator}
                        tracks={details.tracks}
                        id={details._id}
                        url={url}
                    />
                ))}
                <div className="addTrackContainer">
                    <div className="addSong">
                        <h1>Add New Song</h1>
                    </div>
                    <button onClick={async () => {setHidden(false)}}>Add</button>
                </div>
            </div>
        </div>
    );
}
