import Cookies from "js-cookie";
import Playlists from "../components/Playlists";
import Navbar from "../components/Navbar";
import Library from "../components/Library";
import Track from "../components/Track";
import { useEffect, useState } from "react";
import YTtracks from "../components/YTtracks";
import Users from "../components/Users";

// async function getTest() {
//     console.log(Cookies.get("YtToken"));
//     let response = await fetch(
//         `https://youtube.googleapis.com/youtube/v3/subscriptions?part=subscriberSnippet&mine=true`,
//         {
//             method: "GET",
//             headers: {
//                 Authorization: `Bearer ${Cookies.get("YtToken")}`,
//             },
//         }
//     );

//     let title = document.getElementById("test");
//     let realResponse = await response2.json();
//     console.log(realResponse);
// }

export default function Dashboard({
    setPlayerHidden,
    setUrl,
    searchQuery,
    setSearchQuery,
    searchType,
    setSearchType,
}) {
    const testP = () => {
        if (searchType == "Playlists") {
            return <Playlists all={true} searchQuery={searchQuery} />;
        }
    };
    useEffect(() => {
        setPlayerHidden(false);
    }, [])

    let searchSubtitle = `Searching: ${searchQuery} in  `;
    return (
        <div >
            <Navbar
                setSearchType={setSearchType}
                setSearchQuery={setSearchQuery}
            />
            <div className="dashboard">
                <Library />
                <div className="dashboardMain">
                    <h1 className="dashTitle">Welcome {Cookies.get("username")}!</h1>
                    <h2 className="dashSubtitle">
                        {searchQuery || "All Playlists"}
                    </h2>
                    {testP()}
                    {
                        <YTtracks
                            searchType={searchType}
                            searchQuery={searchQuery}
                            setUrl={setUrl}
                        />
                    }
                    {
                        <Users
                        searchType={searchType}
                        searchQuery={searchQuery}
                        />
                    }
                </div>
            </div>
        </div>
    );
}
