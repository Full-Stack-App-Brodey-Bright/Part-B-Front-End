import Header from "../components/Header";

export default function Home() {
    return (
        <>
            <div className="homePage">
                <div className="homeTop">
                    <div className="homeContent">
                        <h1 className="Title">UMH</h1>
                        <h1>Sign Up Free!</h1>
                        <h3>
                            Listen to all of your favourite Youtube tracks in
                            one place!
                        </h3>
                        <button className="homeButton" onClick={() => {location.href = '/signup'}}>Sign Up</button>
                        <p>
                            Universal Music Hub was originally planned to solve
                            the common problem of fragmented music libraries
                            across different streaming platforms. By bridging
                            the gap between Youtube and SoundCloud but
                            Soundcloud has removed public access to thier API so
                            Universal Music Hub is now a Youtube music playlist
                            hub!
                        </p>
                    </div>
                </div>
                <div className="homeBottom">
                    <div className="homeContent">
                    <h1>Example</h1>
                    <p>
                        Universal Music Hub was originally planned to solve the
                        common problem of fragmented music libraries across
                        different streaming platforms. By bridging the gap
                        between Youtube and SoundCloud but Soundcloud has
                        removed public access to thier API so Universal Music
                        Hub is now a Youtube music playlist hub!
                    </p>
                    </div>
                </div>
            </div>
            <div className="coverer"></div>
        </>
    );
}
