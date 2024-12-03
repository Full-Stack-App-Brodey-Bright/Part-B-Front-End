import Background from "../components/Background";

export default function Connect() {
    return (
        <div>
            <Background></Background>
            <div className="centerer">
                <div className="ConnectBox">
                    <button
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
                </div>
            </div>
        </div>
    );
}
