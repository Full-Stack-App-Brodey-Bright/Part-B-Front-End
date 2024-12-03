import { useContext } from "react";
import Background from "../components/Background";
import Cookies from 'js-cookie'


export default function Connect() {
    
    let disabled = Cookies.get('YTConnected?')
    return (
        <div>
            <Background></Background>
            <div className="centerer">
                <div className="ConnectBox">
                    <button disabled={disabled}
                        className="YoutubeButton"
                        onClick={() => {
                            location.href = `${
                                import.meta.env.VITE_AUTH_URI
                            }scope=https%3A//www.googleapis.com/auth/youtube&include_granted_scopes=true&client_id=${
                                import.meta.env.VITE_YOUTUBE_CLIENT_ID
                            }&response_type=token&redirect_uri=http://127.0.0.1:5173/auth`;
                        }}
                    >
                        Youtube
                    </button>
                    <button disabled={!disabled} onClick={() => {
                      location.href = '/dashboard'
                    }}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
