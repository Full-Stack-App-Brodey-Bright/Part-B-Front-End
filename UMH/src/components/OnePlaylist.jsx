import React, { useState } from "react";



// individual playlist boxes when displaying multiple playlists
export default class OnePlaylist extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="PlaylistDash" onClick={() => {location.href = `/playlist/${this.props.id}`}}>
                <div className="PlaylistDashInfo">
                <h1>{this.props.title}</h1>
                <h2>{this.props.creator}</h2>
                </div>
            </div>
        )
    }
}