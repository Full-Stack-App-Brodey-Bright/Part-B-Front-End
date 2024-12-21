import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import User from "./User";

// gets users from database when searching for users
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
    // checks if search type is = users. hides users when not
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
                    // sends individual user data to user component to display
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
