import { useState, React, useEffect } from "react";
import Cookies from "js-cookie";
import PlaylistDetails from "../components/PlaylistDetails";
import { queueCreate } from "../components/Player";
import Library from "../components/Library";
import Navbar from "../components/Navbar";

export default function Playlist({
    playlist,
    setPlaylist,
    setUrl,
    url,
    setPlayerHidden,
}) {
    useEffect(() => {
        setPlayerHidden(false);
    },[])
    const [hidden, setHidden] = useState(true);
    const [isOwner, setIsOwner] = useState(false);
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
        if (response.status == 500) {
            location.href = '/login'
        }
        setPlaylist(await objResponse.playlists);
    }
    useEffect(() => {
        getPlaylist();
    }, []);
    useEffect(() => {
        async function wait() {
            await queueCreate(await playlist);
            if (playlist.length > 0) {
                setIsOwner((await playlist[0].username) == Cookies.get("username"));
            }
            console.log(isOwner)
        }
        wait();
    }, [playlist]);

    async function deletePlaylist() {
        let response = await fetch(`https://part-b-server.onrender.com/api/playlists/${window.location.pathname.split("/")[2]}`, 
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        })
        const objResponse = await response.json()
        if(response.status == 200) {
            location.href = '/dashboard'
        }
        console.log(await objResponse)
    }

    // function checkIfOwner() {
    //     if (isOwner) {
    //         // return (
    //         //     <div
    //         //         onClick={async () => {
    //         //             setHidden(false);
    //         //         }}
    //         //         className="addTrackContainer"
    //         //     >
    //         //         <div className="addSong">
    //         //             <h1>Add New Song</h1>
    //         //         </div>
    //         //     </div>
    //         // );
    //     }
    // }
    return (
        <div>
            <Navbar
                notDashboard={true}
            />
            <Library />
            <div className="test">
                <button hidden={!isOwner} className="deletePlaylistButton" onClick={() => {deletePlaylist()}}>
                    Delete Playlist
                </button>
                {playlist.map((details) => (
                    <PlaylistDetails
                        setUrl={setUrl}
                        title={details.title}
                        description={details.description}
                        username={details.username}
                        tracks={details.tracks}
                        id={details._id}
                        url={url}
                        playlist={playlist}
                        isOwner={isOwner}
                        key={details._id}
                    />
                ))}
            </div>
        </div>
    );
}
