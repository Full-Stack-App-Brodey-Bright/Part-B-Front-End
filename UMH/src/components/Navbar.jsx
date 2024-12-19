import React, {useEffect, useState} from "react";
import Cookies from 'js-cookie'


export default function Navbar({
    setSearchType,
    setSearchQuery,
    notDashboard,
}) {
    const [notificationCount, setNotificationCount] = useState(0)
    async function searchRequest(e) {
        e.preventDefault();
        let searchType = document.getElementById("searchType").value;
        setSearchType(searchType);
        let searchQuery = document.getElementById("searchBar").value;
        setSearchQuery(searchQuery);
        console.log("search: " + searchQuery + searchType);
    }

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
        let objResponse = await response.json()
        console.log(await objResponse.notifications.length)
        setNotificationCount(await objResponse.notifications.length)
    }

    useEffect(() => {
        getUnreadNotifications()
    }, [])

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
            <form onSubmit={searchRequest}>
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
                <button className="notificationsTab" onClick={() => {location.href = '/notifications'}}>{notificationCount}</button>
            </div>
        </div>
    );
}
