import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import User from "./User";

export default function Users({ searchType, searchQuery }) {
    const [userResponse, setUserResponse] = useState({ users: [] });
    const [hideResults, setHideResults] = useState(true)
    async function getUserSearch() {
        let response = await fetch(
            `https://part-b-server.onrender.com/api/user?searchQuery=${searchQuery}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            }
        );
        console.log(await response);
        let realResponse = await response.json();
        console.log(await realResponse);
        setUserResponse(realResponse);
    }
    useEffect(() => {
        if (searchType == "Users") {
            getUserSearch();
            setHideResults(false)
        } else {
            setHideResults(true)
        }
    }, [searchType, searchQuery]);
    return (
        <div className="testing" hidden={hideResults}>
            {userResponse.users.map((item) => {
                console.log(item._id)
                return (
                    <User
                        username={item.username}
                        followers={item.followers.length}
                        playlists={item.playlists.length}
                        id={item._id}
                        key={item._id}
                    />
                );
            })}
        </div>
    );
}
