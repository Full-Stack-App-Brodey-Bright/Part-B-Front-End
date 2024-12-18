import Cookies from "js-cookie";

    export default async function removeSongRequest( tracks, url, id, setUrl ) {
        let removedTracks = await tracks
        removedTracks.forEach(element => {
            if (element._id) {
                delete element._id
            }
        });
        
        const index = removedTracks.map(e => e.url).indexOf(url)
        console.log(index)
        removedTracks.splice(index, 1)
        console.log(await removedTracks)

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
        setUrl('')
        // if (response.status == 200) {
        //     location.href = `/playlist/${id}`
        // }
    }
    // return (
    //     <div>
    //         <div className="centererAddSong">
    //             <div className="addSongBox">
    //                 <button onClick={() => {setHidden(true)}}>Close</button>
    //                 <form className="addSongForm">
    //                     <p>Title</p>
    //                     <input
    //                         className="addSongInput"
    //                         type="text"
    //                         id="titleInput"
    //                         name="title"
    //                         placeholder="Title"
    //                     ></input>
    //                     <p>Artist</p>
    //                     <input
    //                         className="addSongInput"
    //                         type="text"
    //                         id="artistInput"
    //                         name="artist"
    //                         placeholder="Artist"
    //                     ></input>
    //                     <p>URL</p>
    //                     <input
    //                         className="addSongInput"
    //                         type="text"
    //                         id="urlInput"
    //                         name="url"
    //                         placeholder="URL"
    //                     ></input>

    //                     <button
    //                         className="addSongInput"
    //                         onClick={() => {addSongRequest()}}
    //                         type="button"
    //                     >
    //                         Add Song
    //                     </button>
    //                 </form>
    //             </div>
    //         </div>
    //     </div>
    // );

