import Cookies from "js-cookie";
import Background from "./Background";
import React, { useState } from "react";

export default function AddSong({ tracks }) {
    async function addSongRequest() {
        let newTracks = await tracks()
        newTracks.forEach(element => {
            if (element._id) {
                delete element._id
            }
        });
        let data = {
            tracks: await newTracks.concat({
                title: document.getElementById("titleInput").value,
                artist: document.getElementById("artistInput").value,
                url: document.getElementById("urlInput").value.split('=')[1],
            
        })};

        let response = await fetch(`https://part-b-server.onrender.com/api/playlists/${
                window.location.pathname.split("/")[2]
            }`,
            {
                method: "PUT",
                body: JSON.stringify( await data ),
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const objResponse = await response.json()
        console.log(await objResponse)

    }
    return (
        <div>
            <div className="centererAddSong">
                <div className="addSongBox">
                    <form className="addSongForm">
                        <p>Title</p>
                        <input
                            className="addSongInput"
                            type="text"
                            id="titleInput"
                            name="title"
                            placeholder="Title"
                        ></input>
                        <p>Artist</p>
                        <input
                            className="addSongInput"
                            type="text"
                            id="artistInput"
                            name="artist"
                            placeholder="Artist"
                        ></input>
                        <p>URL</p>
                        <input
                            className="addSongInput"
                            type="text"
                            id="urlInput"
                            name="url"
                            placeholder="URL"
                        ></input>

                        <button
                            className="addSongInput"
                            onClick={() => {addSongRequest()}}
                            type="button"
                        >
                            Add Song
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
