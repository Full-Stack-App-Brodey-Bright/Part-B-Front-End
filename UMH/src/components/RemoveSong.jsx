import Cookies from "js-cookie";


    // removes a track
    export default async function removeSongRequest( tracks, url, id, setUrl ) {
        // gets selected playlists tracks
        let removedTracks = await tracks

        // removes track ids from the request data (it doesnt work without it)
        removedTracks.forEach(element => {
            if (element._id) {
                delete element._id
            }
        });
        
        // finds the index of the track to remove
        const index = removedTracks.map(e => e.url).indexOf(url)
        console.log(index)
        // removes the track from the request data
        removedTracks.splice(index, 1)
        console.log(await removedTracks)

        // sends new track data to backend
        let response = await fetch(`https://part-b-server.onrender.com/api/playlists/${id}`,
            {
                method: "PUT",
                body: JSON.stringify({ tracks: await removedTracks }),
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const objResponse = await response.json()
        console.log(await objResponse)
        // sets url to nothing incase user was playing the removed track
        setUrl('')
    }

