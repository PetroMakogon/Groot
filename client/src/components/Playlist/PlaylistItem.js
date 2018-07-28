// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import type { Playlist } from "../../models/Playlist";
import { changeCurrentPlaylist } from "../../actions/changeCurrentPlaylist";
import { changePlayingNow } from "../../actions/changePlayingNow";

type ReduxProps = {
    isCurrentPlaylist: boolean,
    changeCurrentPlaylist: () => void
};

type OwnProps = {
    className?: string,
    style?: Object,
    playlist: Playlist
};

type Props = ReduxProps & OwnProps;

const mapStateToProps = (state, props: OwnProps) => {
    return {
        isCurrentPlaylist:
            state.currentPlaylist !== null &&
            state.currentPlaylist.ID === props.playlist.ID
    };
};

const mapDispatchToProps = (dispatch, props: OwnProps) => {
    return {
        changeCurrentPlaylist: () => {
            const songs = props.playlist.Songs || [];
            if (songs.length > 0) {
                dispatch(changeCurrentPlaylist(props.playlist));
                dispatch(changePlayingNow(songs[0]));
            }
        }
    };
};

class PlaylistItem extends Component<Props> {
    render() {
        const borderClass = this.props.isCurrentPlaylist
            ? "border-light"
            : "border-dark";

        return (
            <div className={this.props.className} style={this.props.style}>
                <div
                    className={`card ${borderClass} rounded-0 bg-transparent w-100`}
                >
                    <div className="card-img-top">
                        <div className="d-flex justify-content-center align-items-center m-auto bg-dark text-light w-100">
                            <h1>
                                <i className="fas fa-music" />
                            </h1>
                        </div>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">
                            <div
                                onClick={() =>
                                    this.props.changeCurrentPlaylist()
                                }
                            >
                                {this.props.playlist.Title}
                            </div>
                        </h5>
                        <h6 className="card-subtitle">
                            {this.props.playlist.NumberOfSongs} songs
                        </h6>
                        <p className="card-text">
                            Last edited at: {this.props.playlist.LastEdited}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlaylistItem);
