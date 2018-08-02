// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import type { Song } from "../models/Song";
import { loadAllSongsAsync } from "../actions/Song/loadAllSongs";
import type { Playlist } from "../models/Playlist";
import PlaylistInfo from "../components/Playlist/PlaylistInfo";
import SongList from "../components/Song/SongList";
import type { RootState } from "../reducers/root";
import ListModal from "../components/Modal/ListModal";
import type { AllSongsPageState } from "../reducers/allSongsPageState";
import { hideSongOperationModal } from "../actions/Modal/hideSongOperationModal";
import { showAddToPlaylistModal } from "../actions/Modal/showAddToPlaylistModal";
import { hideAddToPlaylistModal } from "../actions/Modal/hideAddToPlaylistModal";
import type { AllPlaylistsPageState } from "../reducers/allPlaylistsPageState";
import { loadAllPlaylistsAsync } from "../actions/Playlist/loadAllPlaylists";
import { addSongToPlaylistAsync } from "../actions/Playlist/addSongToPlaylistAsync";

type Props = {
    className?: string,
    style?: Object
} & {
    allSongsPageState: AllSongsPageState,
    allPlaylistsPageState: AllPlaylistsPageState
} & {
    loadAllSongsAsync: () => void,
    addSongToPlaylist: (song: Song, playlist: Playlist) => void,
    hideSongOperationModal: () => void,
    showAddToPlaylistModal: (song: Song) => void,
    hideAddToPlaylistModal: () => void
};

const mapStateToProps = (state: RootState) => {
    return {
        allSongsPageState: state.allSongsPageState,
        allPlaylistsPageState: state.allPlaylistsPageState
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadAllSongsAsync: () => {
            dispatch(loadAllSongsAsync());
        },
        addSongToPlaylist: (song: Song, playlist: Playlist) => {
            dispatch(addSongToPlaylistAsync(song, playlist));
        },
        hideSongOperationModal: () => {
            dispatch(hideSongOperationModal());
        },
        showAddToPlaylistModal: (song: Song) => {
            dispatch(showAddToPlaylistModal(song));
            dispatch(loadAllPlaylistsAsync());
        },
        hideAddToPlaylistModal: () => {
            dispatch(hideAddToPlaylistModal());
        }
    };
};

class AllSongsPage extends Component<Props> {
    componentDidMount() {
        this.props.hideSongOperationModal();
        this.props.hideAddToPlaylistModal();
        this.props.loadAllSongsAsync();
    }

    render() {
        const songs: Array<Song> = this.props.allSongsPageState.songs;

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

                {this.renderSongOperationModal()}
                {this.renderAddToPlaylistModal()}
            </div>
        );
    }

    renderSongOperationModal() {
        if (this.props.allSongsPageState.modal !== "SONG_OPERATION")
            return null;

        const song = this.props.allSongsPageState.operatingSong;

        return (
            <ListModal
                show={true}
                title="Operations"
                onCloseButtonClick={() => {
                    this.props.hideSongOperationModal();
                }}
                items={[
                    {
                        title: "Add to playlist",
                        onClick: () => {
                            if (!song) return;
                            this.props.showAddToPlaylistModal(song);
                        }
                    }
                ]}
            />
        );
    }

    renderAddToPlaylistModal() {
        if (this.props.allSongsPageState.modal !== "ADD_TO_PLAYLIST")
            return null;

        const song = this.props.allSongsPageState.operatingSong;
        const items = this.props.allPlaylistsPageState.playlists.map(
            playlist => {
                const playlistTitle = playlist.Title || "";
                const numberOfSongs = playlist.NumberOfSongs || 0;
                const title = `${playlistTitle} (${numberOfSongs} songs)`;
                return {
                    title: title,
                    onClick: () => {
                        if (!song) return;
                        this.props.addSongToPlaylist(song, playlist);
                    }
                };
            }
        );
        return (
            <ListModal
                show={true}
                title="Add to playlist"
                onCloseButtonClick={() => {
                    this.props.hideAddToPlaylistModal();
                }}
                items={items}
            />
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllSongsPage);
