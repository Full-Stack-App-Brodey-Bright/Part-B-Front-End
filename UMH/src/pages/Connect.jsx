import { useContext, useEffect } from "react";
import Header from "../components/Header";
import Cookies from "js-cookie";

export default function Connect() {
    console.log(Cookies.get("YTConnected"))
    let disabled = Cookies.get('YTConnected') == true
    console.log('is button disabled:' + disabled)

        useEffect(() => {
            console.log('effect')
            console.log(Cookies.get("YTConnected") == true)
            console.log(Cookies.get("YTGotten") !== true)
            if (Cookies.get("YTConnected") == true && Cookies.get("YTGotten") !== true) {
                getYTPlaylists()
            }
        },[])
        async function CreatePlaylistRequest(title, description, tracks) {
            let data = {
                    title: title,
                    description: description,
                    isPublic: true,
                    tracks: tracks
            };
    
            let response = await fetch(`https://part-b-server.onrender.com/api/playlists/`,
                {
                    method: "POST",
                    body: JSON.stringify( await data ),
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`,
                        "Content-Type": "application/json",
                    },
                }
            );
    
            const objResponse = await response.json()
            if (response.status == 201) {
                console.log('Playlist created')
            }
        }
    async function getYTPlaylists() {
        console.log(Cookies.get('YtToken'))
        console.log('test')
        if (Cookies.get('YtToken')) {
            let response = await fetch(
                `https://www.googleapis.com/youtube/v3/playlists?mine=true&part=snippet&maxResults=50`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${Cookies.get('YtToken')}`,
                    },
                }
            );
            let ObjResponse = await response.json()
            console.log(await ObjResponse.items)
            await ObjResponse.items.forEach(async (item) => {
                let YtTracks = []
                let response2 = await fetch(
                    `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${item.id}&part=snippet&maxResults=50`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${Cookies.get('YtToken')}`,
                        },
                    }
                );
                let ObjResponse2 = await response2.json()
                console.log(await ObjResponse2)
                await ObjResponse2.items.forEach(async (video) => {
                    if (await video.snippet.videoOwnerChannelTitle){
                        YtTracks.push({
                            title: await video.snippet.title,
                            artist: await video.snippet.videoOwnerChannelTitle,
                            url: await video.snippet.resourceId.videoId
                        })
                    }
                })
                console.log(await YtTracks)
                CreatePlaylistRequest(await item.snippet.title, await item.snippet.description, await YtTracks)
            });
            Cookies.set('YTGotten', true)
            location.href = '/dashboard'
        }
    }
    return (
        <div>
            <Header />
            <div className="centerer">
                <div className="ConnectBox">
                    <button
                        className="YoutubeButton"
                        hidden={disabled}
                        onClick={() => {
                            location.href = `${
                                import.meta.env.VITE_AUTH_URI
                            }scope=https%3A//www.googleapis.com/auth/youtube&include_granted_scopes=true&client_id=${
                                import.meta.env.VITE_YOUTUBE_CLIENT_ID
                            }&response_type=token&redirect_uri=${
                                import.meta.env.VITE_YOUTUBE_REDIRECT_URI
                            }/auth`;
                        }}
                    >
                       Connect to Youtube
                    </button>
                    <button
                        onClick={() => {
                            location.href = "/dashboard";
                        }}
                    >
                        Skip
                    </button>
                </div>
            </div>
            <div className="coverer"></div>
        </div>
    );
}
