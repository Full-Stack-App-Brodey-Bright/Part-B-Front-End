import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Cookies from "js-cookie";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
let urlGlobal = "";
let currentTrack = {};
let previousTrack = {};
export async function playYtSearchTrack(url) {
    urlGlobal = url;
}

export async function updateTrack(Track) {
    const response = await fetch(
        "https://part-b-server.onrender.com/api/queue/state",
        {
            method: "PATCH",
            body: JSON.stringify({ currentTrack: Track }),
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
                "Content-Type": "application/json",
            },
        }
    );
    let objResponse = await response.json();
    urlGlobal = await objResponse.queue.currentTrack.url;
    previousTrack = currentTrack
    currentTrack = await objResponse.queue.currentTrack;
    // return await response.queue.currentTrack
}
export async function queueCreate(playlist) {
    if (typeof playlist != "undefined") {
        console.log("creating queue");
        try {
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
            currentTrack = await objResponse.queue.currentTrack;
        } catch (error) {}

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
    console.log(await objResponse);
    previousTrack = currentTrack
    console.log(previousTrack)
    currentTrack = await objResponse.nextTrack;
    // return await response.queue.currentTrack
}

// player with play button
export default function Player({
    playlist,
    setPlaylist,
    url,
    setUrl,
    playerHidden,
}) {
    const [duration, setDuration] = useState(0);
    const [sliderPlayed, setSliderPlayed] = useState(0);
    const [playing, setPlaying] = React.useState(false);
    const [canEnd, setCanEnd] = React.useState(false);
    const [muted, setMuted] = useState(false);
    const playerRef = React.useRef();
    var playerUrl = `https://www.youtube.com/watch?v=${url}`;
    useEffect(() => {
        setUrl(urlGlobal);
    }, []);
    useEffect(() => {
        setPlaying(true);
    }, [urlGlobal]);
    let playButton = document.getElementById("playButton");
    let playerContainer = document.getElementsByClassName("playerContainer");

    return (
        <div className="playerContainer">
            <ReactPlayer
                url={playerUrl}
                ref={playerRef}
                playing={playing}
                muted={muted}
                height="0px"
                onError={async () => {
                    if (playing && canEnd) {
                        console.log(
                            `Error playing track URL: ${playerUrl} Video may be age restricted`
                        );
                        await queueNext(playlist);
                        setUrl(await urlGlobal);
                    }
                }}
                onDuration={(dur) => {
                    setDuration(dur);
                    console.log(dur);
                }}
                onProgress={(progress) => {
                    setSliderPlayed(progress.playedSeconds);
                }}
                onPlay={async () => {
                    await setCanEnd(true), (playButton.textContent = "Pause");
                }}
                onPause={() => {
                    playButton.textContent = "Play";
                }}
                onEnded={async () => {
                    if (playing && canEnd) {
                        setPlaying(false);
                        await queueNext(await playlist);
                        setUrl(await urlGlobal);
                        setPlaying(true);
                    }
                }}
            />
            <div className="playerButtons">
                <button className="playerButton">Mode</button>
                <div className="playerButtonsMain">
                    <button className="playerButton">Back</button>
                    <button
                        id="playButton"
                        className="playerButton"
                        hidden={playerHidden}
                        onClick={() => {
                            setPlaying(!playing), console.log("play");
                        }}
                    >
                        Player
                    </button>
                    <button
                        className="playerButton"
                        onClick={async () => {
                            await queueNext(playlist);
                            setUrl(await urlGlobal);
                        }}
                    >
                        Forward
                    </button>
                </div>
            </div>
            <div className="durationBar" hidden={!url}>
                <Slider
                    step={0.5}
                    onChange={(value) => {
                        setMuted(true),
                            setSliderPlayed(value),
                            playerRef.current.seekTo(value);
                    }}
                    onChangeComplete={() => {
                        setMuted(false);
                    }}
                    min={0}
                    max={duration}
                    value={sliderPlayed}
                />
            </div>
        </div>
    );
}
