import { useContext } from "react";
import Header from "../components/Header";
import Cookies from "js-cookie";

export default function Connect() {
    let disabled = Cookies.get("YTConnected?");
    return (
        <div>
            <Header />
            <div className="centerer">
                <div className="ConnectBox">
                    <button
                        disabled={disabled}
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
