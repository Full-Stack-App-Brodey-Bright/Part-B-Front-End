import React from "react";

export default function Navbar() {

    return (
        <div className="Navbar">
            <div className="iconTitle">
                <div className="icon" onClick={() => {location.href = '/dashboard'}}>
                
                </div>
                <h1 onClick={() => {location.href = '/dashboard'}} className="navTitle">UMH</h1>
            </div>
            <div className="searchBarHolder">
                <input id="searchBar" type="text" placeholder="Search"></input>
                <div className="searchBar">
                
                </div>
            </div>

            <div className="dropDownMenu">

            </div>
        </div>
    )
}