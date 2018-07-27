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
                    <div className="card-body">
                        <div className="row text-light">
                            <div className="col-sm-10">
                                <h5 className="card-title">
                                    <div
                                        onClick={() =>
                                            this.props.changeCurrentPlaylist()
                                        }
                                    >
                                        {this.props.playlist.Title}
                                    </div>
                                </h5>
                            </div>
                            <div className="col-sm-2">
                                {this.props.playlist.Songs &&
                                    this.props.playlist.Songs.length}
                            </div>
                        </div>

                        <h6 className="card-subtitle">
                            Last edited at: {this.props.playlist.LastEdited}
                        </h6>
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
