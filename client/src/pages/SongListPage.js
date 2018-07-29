// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import type { Song } from "../models/Song";
import { loadAllSongsAsync } from "../actions/loadAllSongs";
import type { Playlist } from "../models/Playlist";
import PlaylistInfo from "../components/Playlist/PlaylistInfo";
import SongList from "../components/Song/SongList";
import type { RootState } from "../reducers/root";

type Props = {
    className?: string,
    style?: Object,
    songs: Array<Song>,
    loadAllSongsAsync: () => void
};

const mapStateToProps = (state: RootState) => {
    return {
        songs: state.allSongs
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadAllSongsAsync: () => {
            dispatch(loadAllSongsAsync());
        }
    };
};

class SongListPage extends Component<Props> {
    componentDidMount() {
        this.props.loadAllSongsAsync();
    }

    render() {
        const songs: Array<Song> = this.props.songs;

        let playlist: Playlist = {
            ID: "0",
            Title: "All Songs",
            Description: "",
            Songs: songs
        };

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
)(SongListPage);
