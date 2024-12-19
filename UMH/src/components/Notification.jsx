


export default function Notification({actor, type, createdAt, playlistId, title}) {

    function NotificationContentGen() {
        if (type == 'playlist') {
            return (
                <div className="notificationOptionInfo">
                    <h1>{actor.username} created a new playlist: </h1>
                    <h1>{title}</h1>
                    <h4>{createdAt}</h4>
                </div>
            )
        } else if (type == 'like') {
            return (
                <div className="notificationOptionInfo">
                    <h1>{actor.username} liked your playlist: </h1>
                    <h1>{title}</h1>
                    <h4>{createdAt}</h4>
                </div>
            )
        } else {
            return (
            <div className="notificationOptionInfo">
                <h1>{actor.username} has started following you</h1>
                <h4>{createdAt}</h4>
            </div>
            )
        }
    }

    function click() {
        if (type == 'playlist') {
            location.href = `/playlist/${playlistId}`
        } else {
            location.href = `/profile/${actor._id}`
        }
    }
        return (
            <div
                className="notificationOption"
                onClick={click}
            >
                {<NotificationContentGen/>}
            </div>
        );
    }