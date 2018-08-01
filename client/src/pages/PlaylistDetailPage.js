// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import type { Song } from "../models/Song";
import type { Playlist } from "../models/Playlist";
import PlaylistInfo from "../components/Playlist/PlaylistInfo";
import SongList from "../components/Song/SongList";
import type { RootState } from "../reducers/root";
import { loadPlaylistAsync } from "../actions/Playlist/changeDisplayingPlaylist";
import { addSongToPlaylistAsync } from "../actions/Playlist/addSongToPlaylistAsync";
import type { AllPlaylistsPageState } from "../reducers/allPlaylistsPageState";
import { showAddToPlaylistModal } from "../actions/Modal/showAddToPlaylistModal";
import { hideSongOperationModal } from "../actions/Modal/hideSongOperationModal";
import { hideAddToPlaylistModal } from "../actions/Modal/hideAddToPlaylistModal";
import { loadAllPlaylistsAsync } from "../actions/Playlist/loadAllPlaylists";
import type { PlaylistDetailPageState } from "../reducers/playlistDetailPageState";
import ListModal from "../components/Layout/ListModal";

type Props = {
    className?: string,
    style?: Object,
    playlistID: number
} & {
    playlistDetailPageState: PlaylistDetailPageState,
    allPlaylistsPageState: AllPlaylistsPageState
} & {
    loadPlaylistAsync: () => void,
    addSongToPlaylist: (song: Song, playlist: Playlist) => void,
    hideSongOperationModal: () => void,
    showAddToPlaylistModal: (song: Song) => void,
    hideAddToPlaylistModal: () => void
};

const mapStateToProps = (state: RootState) => {
    return {
        playlistDetailPageState: state.playlistDetailPageState,
        allPlaylistsPageState: state.allPlaylistsPageState
    };
};

const mapDispatchToProps = (dispatch: *, props: Props) => {
    return {
        loadPlaylistAsync: () => {
            const playlistID = props.playlistID;
            if (playlistID === 0) return;
            dispatch(loadPlaylistAsync(playlistID));
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

class PlaylistDetailPage extends Component<Props> {
    componentDidMount() {
        this.props.hideSongOperationModal();
        this.props.hideAddToPlaylistModal();
        this.props.loadPlaylistAsync();
    }

    render() {
        const playlist = this.props.playlistDetailPageState.playlist || null;
        if (!playlist) return null;

        const songs: Array<Song> = playlist.Songs || [];

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
        if (this.props.playlistDetailPageState.modal !== "SONG_OPERATION")
            return null;

        const song = this.props.playlistDetailPageState.operatingSong;

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
        if (this.props.playlistDetailPageState.modal !== "ADD_TO_PLAYLIST")
            return null;

        const song = this.props.playlistDetailPageState.operatingSong;
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
)(PlaylistDetailPage);
