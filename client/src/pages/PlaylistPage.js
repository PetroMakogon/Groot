// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import type { Playlist } from "../models/Playlist";
import PlaylistItem from "../components/Playlist/PlaylistItem";
import { loadAllPlaylistsAsync } from "../actions/loadAllPlaylists";
import type { RootState } from "../reducers/root";

type Props = {
    className?: string,
    style?: Object,
    playlists: Array<Playlist>,
    loadAllPlaylists: () => void
};

const mapStateToProps = (state: RootState) => {
    return {
        playlists: state.allPlaylists
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadAllPlaylists: () => {
            dispatch(loadAllPlaylistsAsync());
        }
    };
};

class PlaylistPage extends Component<Props> {
    componentDidMount() {
        this.props.loadAllPlaylists();
    }

    render() {
        const playlists = this.props.playlists;

        return (
            <div className={this.props.className} style={this.props.style}>
                {playlists.map(playlist => {
                    return <PlaylistItem key={playlist.ID} playlist={playlist} className="col-4" />;
                })}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlaylistPage);
