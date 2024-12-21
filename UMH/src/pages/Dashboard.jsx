import Cookies from "js-cookie";
import Playlists from "../components/Playlists";
import Navbar from "../components/Navbar";
import Library from "../components/Library";
import { useEffect, useState } from "react";
import YTtracks from "../components/YTtracks";
import Users from "../components/Users";


export default function Dashboard({
    setPlayerHidden,
    setUrl,
    searchQuery,
    setSearchQuery,
    searchType,
    setSearchType,
}) {
    // on search type playlist, show playlists with search query
    const testP = () => {
        if (searchType == "Playlists") {
            return <Playlists all={true} searchQuery={searchQuery} />;
        }
    };
    // shows player buttons
    useEffect(() => {
        setPlayerHidden(false);
    }, [])

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
                    {/* playlists display */}
                    {testP()}
                    {
                        // Tracks display
                        <YTtracks
                            searchType={searchType}
                            searchQuery={searchQuery}
                            setUrl={setUrl}
                        />
                    }
                    {
                        // users display
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
