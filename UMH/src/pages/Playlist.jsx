import { useState, React, useEffect } from "react";
import Cookies from "js-cookie";
import PlaylistDetails from "../components/PlaylistDetails";
import { queueCreate } from "../components/Player";
import AddSong from "../components/AddSong";
import Library from "../components/Library";
import Navbar from "../components/Navbar";

export default function Playlist({ playlist, setPlaylist, setUrl, url, setPlayerHidden }) {
    setPlayerHidden(false)
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
        console.log(objResponse.playlists)
        await setPlaylist(await objResponse.playlists);
    }
    useEffect(() => {
        getPlaylist();
    }, []);
    useEffect(() => {
        async function wait() {
            queueCreate(await playlist);
        }
        wait()
    }, [playlist]);


    return (
        <div>
            <Navbar/>
            <Library/>
            <div hidden={hidden}><AddSong tracks={async () => {
                return(await playlist[0].tracks )
                
                }}/></div>
            <div className="test">
                {playlist.map((details) => (
                    <PlaylistDetails
                        setUrl={setUrl}
                        title={details.title}
                        description={details.description}
                        username={details.username}
                        tracks={details.tracks}
                        id={details._id}
                        url={url}
                    />
                ))}
                <div className="addTrackContainer">
                    <div onClick={async () => {setHidden(false)}} className="addSong">
                        <h1>Add New Song</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
