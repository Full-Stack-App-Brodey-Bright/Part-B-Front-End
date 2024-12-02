
export default function Youtube() {
    return (
        <div>
        <button onClick={() => {
          location.href = `${import.meta.env.VITE_AUTH_URI}scope=https%3A//www.googleapis.com/auth/youtube&include_granted_scopes=true&client_id=${import.meta.env.VITE_YOUTUBE_CLIENT_ID}&response_type=token&redirect_uri=http://127.0.0.1:5173/auth`}}>
            Youtube
          </button>
        </div>
    )
}