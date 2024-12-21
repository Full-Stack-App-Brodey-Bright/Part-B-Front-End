import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Playlists from "../src/components/Playlists";
import PlaylistDetails from "../src/components/PlaylistDetails";
import Track from "../src/components/Track";

test("get playlist function is called on playlists", async () => {
    render(<Playlists />);
    const spinner = document.getElementsByClassName("spinner")[0];

    expect(spinner).toBeVisible();
});

test('playlist info is rendered on playlist details', () => {
    render(<PlaylistDetails isPublic={true} tracks={[]}/>)

    const playlistInfo = screen.getByText('true')

    expect(playlistInfo).toBeInTheDocument()
})

test('track info is rendered on track', () => {
    render(<Track title={'title'} trackUrl={'q'}/>)

    const trackInfo = screen.getByText('title')

    expect(trackInfo).toBeInTheDocument()
})
