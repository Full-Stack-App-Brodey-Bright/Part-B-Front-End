export default function Notification({
    actor,
    type,
    createdAt,
    playlistId,
    title,
}) {
    // changes the notification text depending on notification type
    function NotificationContentGen() {
        if (type == "playlist") {
            return (
                <div>
                <div className="notificationOptionInfo">
                    <h1>{actor.username} created a new playlist: </h1>
                    <h1>{title}</h1>
                </div>
                <h4 className="timeStamp">{createdAt}</h4>
                </div>
            );
        } else if (type == "like") {
            return (
                <div>
                <div className="notificationOptionInfo">
                    <h1>{actor.username} liked your playlist: </h1>
                    <h1>{title}</h1>
                </div>
                <h4 className="timeStamp">{createdAt}</h4>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="notificationOptionInfo">
                        <h1>{actor.username} has started following you</h1>
                    </div>
                    <h4 className="timeStamp">{createdAt}</h4>
                </div>
            );
        }
    }

    // sends user to the playlist or other user profile depending on notification type
    function click() {
        if (type == "playlist") {
            location.href = `/playlist/${playlistId}`;
        } else {
            location.href = `/profile/${actor._id}`;
        }
    }
    return (
        <div className="notificationOption" onClick={click}>
            {<NotificationContentGen />}
        </div>
    );
}
