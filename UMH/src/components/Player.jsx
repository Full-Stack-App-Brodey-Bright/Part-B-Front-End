import React from "react"
import ReactPlayer from "react-player"


export default function Player({url}) {
    const [playing, setPlaying] = React.useState(false)
    const playerUrl = `https://www.youtube.com/watch?v=${url}`
    return(
    <div>
        <ReactPlayer url={playerUrl} playing={playing} height='0px' />
        <button onClick={() => {setPlaying(!playing), console.log('play')}}>Play</button>
    </div>
    )
}