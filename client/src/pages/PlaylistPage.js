// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import type { Playlist } from "../models/Playlist";
import PlaylistItem from "../components/Playlist/PlaylistItem";
import { loadAllPlaylistsAsync } from "../actions/Playlist/loadAllPlaylists";
import type { RootState } from "../reducers/root";
import PlaylistItemAdd from "../components/Playlist/PlaylistItemAdd";

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
                <PlaylistItemAdd className="col-4 mb-3" />
                {playlists.map(playlist => {
                    return <PlaylistItem key={playlist.ID} playlist={playlist} className="col-4 mb-3" />;
                })}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlaylistPage);
