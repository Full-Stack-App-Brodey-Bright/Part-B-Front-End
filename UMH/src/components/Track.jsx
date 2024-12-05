import React from "react";

export default class Track extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h2>{this.props.artist}</h2>
                <div>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/fuV4yQWdn_4"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                    ></iframe>
                </div>
                <button onClick={() => {}}>Play</button>
            </div>
        );
    }
}
