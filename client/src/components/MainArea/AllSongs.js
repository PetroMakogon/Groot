// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import type { Song } from "../../models/Song";
import { loadAllSongsAsync } from "../../actions/loadAllSongs";
import type { Playlist } from "../../models/Playlist";
import PlaylistInfo from "../PlaylistInfo";
import SongList from "../SongList";

type Props = {
    className?: string,
    style?: Object,
    songs?: Array<Song>,
    dispatchLoadAllSongsAsyncAction?: () => void
};

const mapStateToProps = state => {
    return {
        songs: state.allSongs
    };
};

const mapDispatchToProps = dispatch => {
    return {
        dispatchLoadAllSongsAsyncAction: () => {
            dispatch(loadAllSongsAsync());
        }
    };
};

class AllSongs extends Component<Props> {
    componentDidMount() {
        if (this.props.dispatchLoadAllSongsAsyncAction) {
            this.props.dispatchLoadAllSongsAsyncAction();
        }
    }

    render() {
        const songs: Array<Song> = this.props.songs || [];

        let playlist: Playlist = {
            ID: "0",
            Title: "All Songs",
            Description: "",
            Songs: songs
        };

        return (
            <div className={this.props.className} style={this.props.style}>
                <PlaylistInfo className="col-sm-3 mt-3" playlist={playlist} />
                <SongList className="col-sm-9 mt-3" songs={songs} />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllSongs);
