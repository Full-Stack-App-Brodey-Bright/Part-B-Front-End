import React, { useState } from "react";
import Track from "./Track";


export default class PlaylistDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h2>{this.props.description}</h2>
                <button onClick={() => {location.href = `http://127.0.0.1:5173/playlist/${this.props.id}`}}>
                    Play
                </button>
                <div>
                    {
                        this.props.tracks.map((track) => <Track title={track.title} artist={track.artist} />)
                    }
                </div>

            </div>
        )
    }
}