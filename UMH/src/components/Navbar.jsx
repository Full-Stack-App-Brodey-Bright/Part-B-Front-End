import React from "react";

export default function Navbar({setSearchType, setSearchQuery, notDashboard}) {

    async function searchRequest(e){
        e.preventDefault()
        let searchType = document.getElementById('searchType').value
        setSearchType(searchType)
        let searchQuery = document.getElementById("searchBar").value
        setSearchQuery(searchQuery)
        console.log('search: ' + searchQuery + searchType)
    }
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
                        <option value="Playlists" defaultChecked>Playlists</option>
                        <option value="Tracks">Tracks</option>
                        <option value="Users">Users</option>
                        <option value="Artists">Artists</option>
                    </select>
                </div>
                <div className="searchBarHolder" onClick={() => {
                    if (notDashboard) {
                        location.href = '/dashboard'
                    }
                }}>
                    <input
                        id="searchBar"
                        type="text"
                        placeholder="Search"
                    ></input>
                    <div className="searchBar"></div>
                </div>
            </form>
            <div className="dropDownMenu"></div>
        </div>
    );
}
