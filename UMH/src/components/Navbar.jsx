import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Navbar({
    setSearchType,
    setSearchQuery,
    notDashboard,
}) {

    // checks if user is on the mobile search page and displays mobile version
    async function searchWait() {
        let search = await document.getElementsByClassName("searchComponent")[0];
        let navbar = await document.getElementsByClassName("Navbar")[0];
        if (location.href == `${import.meta.env.VITE_URL}/search`) {
            await search;
            await navbar;
            search.style.display = "block";
            navbar.style.height = '25vh'
            navbar.style.zIndex = '0'
            navbar.style.alignItems = 'flex-start'
            navbar.style.marginTop = '2vh'
        }
    }

    useEffect(() => {
        searchWait();
    }, []);

    // displays notification count
    const [notificationCount, setNotificationCount] = useState(0);

    // on search request sets search query and search type
    async function searchRequest(e) {
        e.preventDefault();
        let searchType = document.getElementById("searchType").value;
        setSearchType(searchType);
        let searchQuery = document.getElementById("searchBar").value;
        setSearchQuery(searchQuery);
        console.log("search: " + searchQuery + searchType);
    }

    // gets notification count
    async function getUnreadNotifications() {
        let response = await fetch(
            `https://part-b-server.onrender.com/api/notifications`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            }
        );
        let objResponse = await response.json();
        setNotificationCount(await objResponse.notifications.length);
        try {
            if (response.status == 500) {
                throw new Error('Token expired please login')
            }
        } catch(error) {
            location.href = '/login'
        }
    }

    useEffect(() => {
        getUnreadNotifications();
    }, []);

    return (
        <div className="Navbar">
            <div className="iconTitle">
                <div
                    className="icon"
                    onClick={() => {
                        location.href = "/dashboard";
                    }}
                ></div>
                <h1
                    onClick={() => {
                        location.href = "/dashboard";
                    }}
                    className="navTitle"
                >
                    UMH
                </h1>
            </div>
            <form onSubmit={searchRequest} className="searchComponent">
                <div className="searchTypeMenu">
                    <label htmlFor="searchType">Searching for: </label>
                    <select name="searchType" id="searchType">
                        <option value="Playlists" defaultChecked>
                            Playlists
                        </option>
                        <option value="Tracks">Tracks</option>
                        <option value="Users">Users</option>
                        <option value="Artists">Artists</option>
                    </select>
                </div>
                <div
                    className="searchBarHolder"
                    onClick={() => {
                        if (notDashboard) {
                            location.href = "/dashboard";
                        }
                    }}
                >
                    <input
                        id="searchBar"
                        type="text"
                        placeholder="Search"
                    ></input>
                    <div className="searchBar"></div>
                </div>
            </form>
            <div>
                <button
                    className="notificationsTab"
                    onClick={() => {
                        location.href = "/notifications";
                    }}
                >
                    {notificationCount}
                </button>
            </div>
        </div>
    );
}
