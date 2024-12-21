import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Cookies from "js-cookie";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

// global variables for player to access
let urlGlobal = "";
let currentTrack = {};
let previousTrack = [];

// play back mode selector
let modes = ["normal", "shuffle", "repeat", "repeat_one"];
let currentMode = 0;

// plays track when track is searched for (not in playlistDB)
export async function playYtSearchTrack(url) {
    urlGlobal = url;
}

// sends playback mode to backend and updates queue accordingly
async function changePlaybackMode(playbackMode) {
    await fetch("https://part-b-server.onrender.com/api/queue/mode", {
        method: "PATCH",
        body: JSON.stringify({ playbackMode: playbackMode }),
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
        },
    });
}

// changes the current playing track
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
    // saves previous track for back button
    previousTrack.push(currentTrack);
    console.log(previousTrack);
    currentTrack = await objResponse.queue.currentTrack;
}

// creates queue
export async function queueCreate(playlist) {
    // checks if playlist is loaded
    if (typeof playlist != "undefined") {
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

// gets the next track from queue
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
    previousTrack.push(currentTrack);
    console.log(previousTrack);
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
    // alot of usestates (my bad)
    const [duration, setDuration] = useState(0);
    const [sliderPlayed, setSliderPlayed] = useState(0);
    const [playing, setPlaying] = React.useState(false);
    const [canEnd, setCanEnd] = React.useState(false);
    const [muted, setMuted] = useState(false);
    const playerRef = React.useRef();

    // sets track with url
    var playerUrl = `https://www.youtube.com/watch?v=${url}`;

    // sets url to saved url
    useEffect(() => {
        setUrl(urlGlobal);
    }, []);

    // plays the track if the track changes
    useEffect(() => {
        setPlaying(true);
    }, [url, currentTrack]);

    let playButton = document.getElementById("playButton");
    let modeButton = document.getElementById("modeButton");

    return (
        <div className="playerContainer">
            {/* mobile navbar when on mobile */}
            <div className="mobileNav">
                <button
                    className="mobileNavButton"
                    onClick={() => {
                        location.href = "/dashboard";
                    }}
                >
                    Home
                </button>
                <button
                    className="mobileNavButton"
                    onClick={() => {
                        location.href = "/search";
                    }}
                >
                    Search
                </button>
                <button
                    className="mobileNavButton"
                    onClick={() => {
                        location.href = "/library";
                    }}
                >
                    Library
                </button>
            </div>

            <ReactPlayer
                url={playerUrl}
                ref={playerRef}
                playing={playing}
                muted={muted}
                height="0px"
                onError={async () => {
                    // if the track cant play (age restricted or private) and the player is playing. skip the track
                    if (playing && canEnd) {
                        console.log(
                            `Error playing track URL: ${playerUrl} Video may be age restricted`
                        );
                        await queueNext(playlist);
                        setUrl(await urlGlobal);
                    }
                }}
                // sets duration of duration bar
                onDuration={(dur) => {
                    setDuration(dur);
                    console.log(dur);
                }}
                // sets duration bar progress
                onProgress={(progress) => {
                    setSliderPlayed(progress.playedSeconds);
                }}
                // changes the play button to pause while playing
                onPlay={async () => {
                    await setCanEnd(true), (playButton.textContent = "Pause");
                }}
                // changes the play button to play while paused
                onPause={() => {
                    playButton.textContent = "Play";
                }}
                // if the player is playing and the track ends. play the next track
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
                <button
                    className="playerButton"
                    id="modeButton"
                    onClick={() => {
                        // toggles the mode button on click by currentMode index
                        modes.length - 1 == currentMode
                            ? (currentMode = 0)
                            : (currentMode += 1);
                        changePlaybackMode(modes[currentMode]);
                        modeButton.textContent = modes[currentMode];
                        console.log(currentMode);
                    }}
                >
                    normal
                </button>
                <div className="playerButtonsMain">
                    {/* back button logic */}
                    <button
                        className="playerButton"
                        onClick={() => {
                            // if there is a previous track go back. or do nothing
                            try {
                                previousTrack.length > 0
                                    ? (urlGlobal =
                                          previousTrack[
                                              previousTrack.length - 1
                                          ].url)
                                    : console.log("no more previous tracks");
                                currentTrack =
                                    previousTrack[previousTrack.length - 1];
                                previousTrack.pop();
                                setUrl(urlGlobal);
                            } catch (error) {}
                        }}
                    >
                        Back
                    </button>
                    <button
                        // play button plays player
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
                        // forward button skips to next track in queue
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
            {/* duration bar hides if no track is playing */}
            <div className="durationBar" hidden={!url}>
                <Slider
                    step={0.5}
                    // when the user moves the bar sets track progress to the bar progress and mutes
                    onChange={(value) => {
                        setMuted(true),
                            setSliderPlayed(value),
                            playerRef.current.seekTo(value);
                    }}
                    // unmutes when user lets go of bar
                    onChangeComplete={() => {
                        setMuted(false);
                    }}
                    // sets duration and progress of bar to players duration and progress
                    min={0}
                    max={duration}
                    value={sliderPlayed}
                />
            </div>
        </div>
    );
}
