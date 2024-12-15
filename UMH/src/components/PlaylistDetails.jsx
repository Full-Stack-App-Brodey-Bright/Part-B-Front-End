import React, {componentDidUpdate, useState } from "react";
import Track from "./Track";
let arr = []
let trackElements = document.getElementsByClassName('playlistTrack')
// playlist selected to show tracks and other data
export default class PlaylistDetails extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidUpdate(prevProps) {
        if (this.props.url !== prevProps.url) {
            let newIndex = arr.findIndex((element) => element.props.url == this.props.url)
            for (const element of trackElements) {
                element.style.backgroundColor = 'grey'
            }
            trackElements[newIndex].style.backgroundColor = 'green'
        }
    }
    render() {
        return (
            <div>
                <div className="playlistInfo">
                    <h1>{this.props.title}</h1>
                    <h3>{this.props.username}</h3>
                    <h3>{this.props.description}</h3>
                </div>
                <div className="scroll">
                    {arr = this.props.tracks.map((track) => (
                        <Track
                            setUrl={this.props.setUrl}
                            track={track}
                            title={track.title}
                            artist={track.artist}
                            url={track.url}
                            key={track._id}
                        />
                    ))}
                </div>
            </div>
        );
    }

}
