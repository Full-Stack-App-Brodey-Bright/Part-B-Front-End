import React, {useEffect, useState} from "react";
import { updateTrack } from "./Player";
import Track from "./Track";

// handles YTtracks not in database when searching for tracks
export default function YTtracks ({searchType, searchQuery, setUrl}) {
    const [hideResults, setHideResults] = useState(true)
    const [ytResponse, setYtResponse] = useState({items: []})
    // sends search query to YT API 
    async function getYTSearch() {
        let response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${
                import.meta.env.VITE_YTAPI_KEY
            }&part=snippet&order=relevance&q=${searchQuery.replace(
                " ",
                "+"
            )}&type=video`,
            {
                method: "GET",
            }
        );
        console.log(await response);
        let realResponse = await response.json();
        console.log(await realResponse);

        setYtResponse(realResponse)
        
    }

    // checks if search type is = tracks. hides tracks if not
    useEffect(() => {
        if (searchType == 'Tracks') {
            getYTSearch()
            setHideResults(false)
        } else {
            setHideResults(true)
        }
    }, [searchType, searchQuery]);

    return (
            <div className="testing" hidden={hideResults}>
                {
                   ytResponse.items.map((item) => {
                    // sends track data to track component for display
                    return <Track
                    title={item.snippet.title}
                    artist={item.snippet.channelTitle}
                    trackUrl={item.id.videoId}
                    setUrl={setUrl}
                    isOwner={false}
                    key={item.id.videoId}
                    />
                })}
            </div>
        );
    }