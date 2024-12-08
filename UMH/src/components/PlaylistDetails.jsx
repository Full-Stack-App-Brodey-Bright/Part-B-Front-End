import React, { useState } from "react";
import Track from "./Track";

// playlist selected to show tracks and other data
export default class PlaylistDetails extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h2>{this.props.description}</h2>
                <button onClick={() => {location.href = `/playlist/${this.props.id}`}}>
                    Play
                </button>
                <div>
                    {
                        this.props.tracks.map((track) => <Track setUrl={this.props.setUrl} track={track} title={track.title} artist={track.artist} url={track.url}/>)
                    }
                </div>

            </div>
        )
    }
}