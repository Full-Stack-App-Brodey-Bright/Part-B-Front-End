import { useContext } from "react";
import Header from "../components/Header";
import Cookies from "js-cookie";

export default function Connect() {
    let disabled = Cookies.get("YTConnected?");

    async function getYTPlaylists() {
        console.log(Cookies.get('YTConnected'))
        if (Cookies.get("YTConnected") == true) {
            let response = await fetch(
                `https://www.googleapis.com/youtube/v3/playlists?mine=true&part=snippet&maxResults=50`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${Cookies.get("YtToken")}`,
                    },
                }
            );
            let ObjResponse = await response.json()
            console.log(await ObjResponse.items)
        }
    }
    return (
        <div>
            <Header />
            <div className="centerer">
                <div className="ConnectBox">
                    <button
                        className="YoutubeButton"
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
                        Youtube
                    </button>
                    <button onClick={getYTPlaylists}>
                        getytplaylists
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
