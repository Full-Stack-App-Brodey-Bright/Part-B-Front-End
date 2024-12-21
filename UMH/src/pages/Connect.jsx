import { useContext, useEffect } from "react";
import Header from "../components/Header";
import Cookies from "js-cookie";

// connects youtube account with oAuth
export default function Connect() {
    console.log(Cookies.get("YTConnected"))
    // Disables the youtube button if already connected
    let disabled = Cookies.get('YTConnected') == 'true'
    console.log('is button disabled:' + disabled)

        // ports playlists from youtube if youtube is connect and playlists havent been ported already
        useEffect(() => {
            if (Cookies.get("YTConnected") == 'true' && Cookies.get("YTGotten") !== 'true') {
                getYTPlaylists()
            }
        },[])

        // creates the youtube playlist
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
            // sends user to dashboard after playlists are created
            const objResponse = await response.json()
            if (response.status == 201) {
                console.log('Playlist created')
                location.href = '/dashboard'
            }
        }
        // gets playlists from youtube
    async function getYTPlaylists() {
        console.log(Cookies.get('YtToken'))
        console.log('test')
        // if user has connected to YT get playlists
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
            // for each YT playlist get tracks
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
                // for each track add the track to the playlist
                await ObjResponse2.items.forEach(async (video) => {
                    if (await video.snippet.videoOwnerChannelTitle){
                        YtTracks.push({
                            title: await video.snippet.title,
                            artist: await video.snippet.videoOwnerChannelTitle,
                            url: await video.snippet.resourceId.videoId
                        })
                    }
                })
                // creates a playlist for each YT playlist with tracks from each playlist 
                console.log(await YtTracks)
                CreatePlaylistRequest(await item.snippet.title, await item.snippet.description, await YtTracks)
            });
            Cookies.set('YTGotten', true)
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
                        }} className="homeButton"
                    >
                        Skip
                    </button>
                </div>
            </div>
            <div className="coverer"></div>
        </div>
    );
}
