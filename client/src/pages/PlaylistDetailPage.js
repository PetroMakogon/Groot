// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import type { Song } from "../models/Song";
import type { Playlist } from "../models/Playlist";
import PlaylistInfo from "../components/Playlist/PlaylistInfo";
import SongList from "../components/Song/SongList";
import type { RootState } from "../reducers/root";
import { loadPlaylistAsync } from "../actions/changeDisplayingPlaylist";

type Props = {
    className?: string,
    style?: Object,
    playlistID: number
} & {
    playlist: Playlist,
    loadPlaylist: () => void
};

const mapStateToProps = (state: RootState) => {
    return {
        playlist: state.displayingPlaylist
    };
};

const mapDispatchToProps = (dispatch: *, props: Props) => {
    return {
        loadPlaylist: () => {
            const playlistID = props.playlistID;
            dispatch(loadPlaylistAsync(playlistID));
        }
    };
};

class PlaylistDetailPage extends Component<Props> {
    render() {
        const playlist: Playlist = this.props.playlist || null;
        if (!playlist) return null;

        const songs: Array<Song> = this.props.playlist.Songs || [];

        return (
            <div className={this.props.className} style={this.props.style}>
                <PlaylistInfo className="col-sm-3" playlist={playlist} />
                <SongList className="col-sm-9" songs={songs} />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlaylistDetailPage);
