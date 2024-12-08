import Cookies from "js-cookie";
import Playlists from "../components/Playlists";
import Navbar from "../components/Navbar";
import Library from "../components/Library";

async function getTest() {
    console.log(Cookies.get("YtToken"));
    let response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/subscriptions?part=subscriberSnippet&mine=true`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${Cookies.get("YtToken")}`,
            },
        }
    );

    let title = document.getElementById("test");
    let realResponse = await response2.json();
    console.log(realResponse);
}

export default function Dashboard({setPlayerHidden}) {
    setPlayerHidden(false)
    return (
        <div>
            <Navbar />
            <div className="dashboard">
                <Library/>
                <div>
                    <h1 id="test">hi</h1>
                    <button onClick={getTest}>huh88j</button>
                </div>
            </div>
        </div>
    );
}
