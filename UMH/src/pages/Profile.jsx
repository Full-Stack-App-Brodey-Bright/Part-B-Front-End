import Library from "../components/Library";
import Navbar from "../components/Navbar";
import { useState, React, useEffect } from "react";
import Cookies from "js-cookie";
import sp from "../assets/sp.svg";
import OnePlaylist from "../components/OnePlaylist";

export default function Profile() {
    const [profileId, setProfileId] = useState("");
    const [username, setUsername] = useState("");
    const [following, setFollowing] = useState("");
    const [followers, setFollowers] = useState([]);
    const [playlistCount, setPlaylistCount] = useState("");
    const [spinnerHidden, setSpinnerHidden] = useState(true);
    const [userPlaylists, setUserPlaylists] = useState([]);
    async function getUser() {
        setSpinnerHidden(false);
        let response = await fetch(
            `https://part-b-server.onrender.com/api/user/${
                window.location.pathname.split("/")[2]
            }`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            }
        ).then(setSpinnerHidden(false));
        const objResponse = await response.json();
        setSpinnerHidden(true);
        console.log(objResponse);
        setUsername(await objResponse.userDetails.username);
        setFollowers(await objResponse.userDetails.followers);
        setFollowing(await objResponse.userDetails.following);
        setPlaylistCount(await objResponse.playlists.length);
        setProfileId(await objResponse.userDetails.id);
        setUserPlaylists(await objResponse.playlists);
    }

    useEffect(() => {
        followButtonToggle();
    }, [followers]);

    async function followButtonToggle() {
        let followButton = document.getElementById("followButton");
        let followerIndex = await followers.findIndex(
            (element) => element == Cookies.get("userId")
        );
        if (Cookies.get("userId") == profileId) {
            followButton.hidden = true;
        }
        if ((await followerIndex) > -1) {
            followButton.textContent = "Unfollow";
        } else {
            followButton.textContent = "Follow";
        }
    }

    async function followRequest() {
        setSpinnerHidden(false);
        let response = await fetch(
            `https://part-b-server.onrender.com/api/user/${
                window.location.pathname.split("/")[2]
            }/follow`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            }
        ).then(setSpinnerHidden(false));
        const ObjResponse = await response.json();
        console.log(await ObjResponse);
        setSpinnerHidden(true);
        location.href = location.href;
    }
    // if playlists exist stop sending requests
    useEffect(() => {
        getUser();
    }, []);

    return (
        <div>
            <Navbar />
            <Library />
            <div className="profileContainer">
                <div className="profileTopper">
                    <div className="profilePicture"></div>
                    <div className="profileDetails">
                        <img
                            className="spinner"
                            src={sp}
                            hidden={spinnerHidden}
                        ></img>
                        <h1 className="profileUsername">{username}</h1>
                        <div className="profileButtons">
                            <button id="followButton" onClick={followRequest}>
                                Follow
                            </button>
                            <button className="youtubeButton">Youtube</button>
                        </div>
                        <div className="profileInfo">
                            <h3>{followers.length} Followers</h3>
                            <h3>{following.length} Following</h3>
                            <h3>{playlistCount} Playlists</h3>
                        </div>
                    </div>
                </div>
                <div className="profileContent">
                    <h1 className="profileSubtitle">Public Playlists</h1>
                    <div className="profilePlaylists">
                        {userPlaylists.map((playlist) => (
                            <OnePlaylist
                                title={playlist.title}
                                description={playlist.description}
                                creator={playlist.username}
                                tracks={playlist.tracks}
                                id={playlist._id}
                                key={playlist._id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
