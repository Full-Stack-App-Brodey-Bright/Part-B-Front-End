
export default function Auth() {
    let hash = window.location.hash
    let accessToken = hash.split('&')[0].split('=')[1]
    console.log(accessToken)
    return(
        <div>

        </div>
    )
}