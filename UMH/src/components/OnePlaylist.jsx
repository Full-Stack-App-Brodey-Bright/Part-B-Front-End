import React, { useState } from "react";



// individual playlist boxes when displaying multiple playlists
export default class OnePlaylist extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="PlaylistDash">
                <h1>{this.props.title}</h1>
                <h2>{this.props.description}</h2>
                <button onClick={() => {location.href = `/playlist/${this.props.id}`}}>
                    Play
                </button>
            </div>
        )
    }
}