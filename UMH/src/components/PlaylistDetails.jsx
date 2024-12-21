import React, { componentDidUpdate, useState } from "react";
import Track from "./Track";
import { queueNext } from "./Player";
let arr = [];
let trackElements = document.getElementsByClassName("playlistTrack");
// playlist selected to show tracks and other data
export default class PlaylistDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    // checks if track is playing and sets the playing tracks color to green and all other tracks to gray
    componentDidUpdate(prevProps) {
        // if playing url changes find the index of the playing track in the html collection
        if (this.props.url !== prevProps.url) {
            let newIndex = arr.findIndex(
                (element) => element.props.url == this.props.url
            );
            // sets all tracks to grey
            for (const element of trackElements) {
                element.style.backgroundColor = "grey";
            }
            try {
                // sets playing track to green
                trackElements[newIndex].style.backgroundColor = "green";
            } catch (error) {
                // skips track if track cant be played
                queueNext(this.props.playlist);
            }
        }
    }
    render() {
        return (
            <div>
                {/* playlist info */}
                <div className="playlistInfo">
                    <h1>{this.props.title}</h1>
                    <h3>{this.props.username}</h3>
                    <h4>{this.props.description}</h4>
                    <h4>{this.props.isPublic.toString()}</h4>
                </div>
                {/* div that scrolls when tracks reach bottom */}
                <div className="scroll">
                    {
                        (arr = this.props.tracks.map((track) => (
                            // sends tracks to track component for display
                            <Track
                                setUrl={this.props.setUrl}
                                track={track}
                                title={track.title}
                                artist={track.artist}
                                url={track.url}
                                playlistId={this.props.id}
                                tracks={this.props.tracks}
                                isOwner={this.props.isOwner}
                                key={track._id}
                            />
                        )))
                    }
                </div>
            </div>
        );
    }
}
