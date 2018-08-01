// @flow
import React, { Component } from "react";
import type { Playlist } from "../../models/Playlist";
import { changePlayingNow } from "../../actions/Song/changePlayingNow";
import { connect } from "react-redux";
import type { RootState } from "../../reducers/root";
import { removePlaylistAsync } from "../../actions/Playlist/removePlaylistAsync";

type Props = {
    className?: string,
    style?: Object,
    playlist: Playlist
} & {
    playThisList: () => void,
    removePlaylist: (playlist: Playlist) => void
};

const styles = {
    imageBox: {
        width: 100,
        height: 100
    },
    imageIcon: {
        fontSize: "32px"
    }
};

const mapStateToProps = (state: RootState) => {
    return {};
};

const mapDispatchToProps = (dispatch: *, props: Props) => {
    return {
        playThisList: () => {
            const queue = props.playlist.Songs || [];
            const song = queue[0] || null;
            if (!song) return;
            dispatch(changePlayingNow(song, queue));
        },
        removePlaylist: (playlist: Playlist) => {
            if (confirm("Are you sure?")) {
                dispatch(removePlaylistAsync(playlist));
            }
        }
    };
};

class PlaylistInfo extends Component<Props> {
    render() {
        const songs = this.props.playlist.Songs || [];

        return (
            <div className={this.props.className} style={this.props.style}>
                <div className="card text-center bg-transparent">
                    <div
                        className="d-flex justify-content-center align-items-center m-auto bg-dark text-light"
                        style={styles.imageBox}
                    >
                        <i className="fas fa-music" style={styles.imageIcon} />
                    </div>

                    <div className="card-body">
                        <h5 className="card-title">
                            {this.props.playlist.Title}
                        </h5>
                        <h6 className="card-subtitle">{songs.length} songs</h6>
                        <p className="card-text">
                            {this.props.playlist.Description}
                        </p>
                        <button
                            className="btn btn-primary btn-lg rounded-0 w-100"
                            onClick={() => this.props.playThisList()}
                        >
                            Play
                        </button>
                        <br />
                        {this.renderOptionsButton()}
                    </div>
                </div>
            </div>
        );
    }

    renderOptionsButton() {
        if (parseInt(this.props.playlist.ID) === 0) {
            return null;
        }

        return (
            <button
                className="btn bg-transparent rounded-0 mt-3 text-light"
                onClick={() => {
                    this.props.removePlaylist(this.props.playlist);
                }}
            >
                <i className="fas fa-trash text-danger" />
            </button>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlaylistInfo);
