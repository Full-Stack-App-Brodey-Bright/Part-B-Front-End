import React from "react";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";
import Playlists from "../components/Playlists";
import Library from "../components/Library";
import Track from "../components/Track";
import { useEffect, useState } from "react";
import YTtracks from "../components/YTtracks";
import Users from "../components/Users";

export default function SearchMobile({
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
    }, []);

    let searchSubtitle = `${searchQuery}`;
    return (
        <div>
            <Navbar
                setSearchType={setSearchType}
                setSearchQuery={setSearchQuery}
            />
            <div>
                <div className="dashboard">
                    <div className="dashboardMain">
                        <h2>{searchSubtitle}</h2>
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
        </div>
    );
}
