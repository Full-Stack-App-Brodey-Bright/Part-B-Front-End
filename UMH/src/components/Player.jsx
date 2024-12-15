import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Cookies from "js-cookie";

let urlGlobal = "";
let currentTrack = {};
export async function playYtSearchTrack(url) {
    urlGlobal = url
}

export async function updateTrack(currentTrack) {

    const response = await fetch(
        "https://part-b-server.onrender.com/api/queue/state",
        {
            method: "PATCH",
            body: JSON.stringify({ currentTrack: currentTrack }),
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
                "Content-Type": "application/json",
            },
        }
    );
    let objResponse = await response.json();
    urlGlobal = await objResponse.queue.currentTrack.url;
    currentTrack = await objResponse.queue.currentTrack
    // return await response.queue.currentTrack
}
export async function queueCreate(playlist) {
    if (window.playlist){
    const response = await fetch(
        "https://part-b-server.onrender.com/api/queue",
        {
            method: "POST",
            body: JSON.stringify({ playlistId: playlist[0]._id }),
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
                "Content-Type": "application/json",
            },
        }
    );
    let objResponse = await response.json();
    urlGlobal = await objResponse.queue.currentTrack.url;
    currentTrack = await objResponse.queue.currentTrack
    // return await response.queue.currentTrack
}
}
export async function queueNext(playlist) {
    const response = await fetch(
        "https://part-b-server.onrender.com/api/queue/next",
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        }
    );
    let objResponse = await response.json();
    urlGlobal = await objResponse.nextTrack.url;
    console.log(await objResponse)
    currentTrack = await objResponse.nextTrack;
    // return await response.queue.currentTrack
}

// player with play button
export default function Player({ playlist, setPlaylist, url, setUrl, playerHidden}) {
    const [playing, setPlaying] = React.useState(false);
    const [canEnd, setCanEnd] = React.useState(false);
    var playerUrl = `https://www.youtube.com/watch?v=${url}`;
    useEffect(() => {
        setUrl(urlGlobal)
    },[])
    useEffect(() => {
        setPlaying(true)
    },[urlGlobal])
    let playingD = document.getElementById('playingD')
    let playerContainer = document.getElementsByClassName('playerContainer')


    return (
        <div className="playerContainer">
            <ReactPlayer
                url={playerUrl}
                playing={playing}
                height="0px"
                onError={async () => {
                    if (playing && canEnd) {
                        await queueNext(playlist);
                        setUrl(await urlGlobal);
                    }
                }}
                onPlay={async () => {await setCanEnd(true), playingD.textContent = 'Pause'}}
                onPause={() => {playingD.textContent = 'Play'}}
                onEnded={async () => {
                    if (playing && canEnd) {
                    setPlaying(false)
                    await queueNext(await playlist)
                    setUrl(await urlGlobal)
                    setPlaying(true)
                }}}
            />
            <button id="playingD" hidden={playerHidden}
                onClick={() => {
                    setPlaying(!playing) ,console.log("play");
                }}
            >
                Player
            </button>
        </div>
    );
}
