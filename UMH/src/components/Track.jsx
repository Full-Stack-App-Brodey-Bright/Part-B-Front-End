import React, { useState } from "react";
import ReactPlayer from 'react-player'
import Player from "./Player";


// individual track component
export default class Track extends React.Component {
    constructor(props) {
        super(props);
    } 
    
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h2>{this.props.artist}</h2>
                <Player url={this.props.url}/>
            </div>
        );
    }
}
