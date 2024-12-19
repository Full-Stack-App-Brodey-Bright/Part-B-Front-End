import React from "react";
import Library from "../components/Library";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import sp from "../assets/sp.svg";
import Notification from "../components/Notification";

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);
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
        console.log(await objResponse.notifications.length);
        console.log(await objResponse.notifications);
        setNotifications(await objResponse.notifications);
    }

    useEffect(() => {
        getUnreadNotifications();
    }, []);

    return (
        <div>
            <Navbar />
            <Library />
            <div className="notificationContainer">
                <h1>Notifications</h1>
                <div className="notifications">
                    {notifications.map((notification) => (
                        <Notification
                            actor={notification.actor}
                            type={notification.type}
                            createdAt={notification.createdAt}
                            playlistId={notification.playlist}
                            title={notification.playlistTitle}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
