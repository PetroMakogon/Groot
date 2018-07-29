// @flow
import React, { Component } from "react";
import type { Song } from "../../models/Song";
import { connect } from "react-redux";
import { changePlayingNow } from "../../actions/changePlayingNow";
import type { RootState } from "../../reducers/root";

type Props = {
    className?: string,
    style?: Object,
    song: Song,
    queue: Array<Song>
} & {
    isPlayingNow: boolean,
    playThisSong: () => void
};

type State = {
    mouseOver: boolean
};

const styles = {
    container: {
        width: "100%"
    },
    playButtonContainer: {
        width: 24,
        height: 24
    }
};

const mapStateToProps = (state: RootState, props: Props) => {
    const song = state.playingNow.song;
    return {
        isPlayingNow: song !== null && song.ID === props.song.ID,
        playingQueue: state.playingNow.queue
    };
};

const mapDispatchToProps = (dispatch: *, props: Props) => {
    return {
        playThisSong: () => {
            dispatch(changePlayingNow(props.song, props.queue));
        }
    };
};

class SongListItem extends Component<Props, State> {
    constructor(props: *) {
        super(props);
        this.state = {
            mouseOver: false
        };
    }

    onMouseOver() {
        this.setState({
            mouseOver: true
        });
    }

    onMouseOut() {
        this.setState({
            mouseOver: false
        });
    }

    onPlayButtonClick() {
        this.props.playThisSong();
    }

    onOptionsButtonClick() {
        alert(`onOptionsButtonClick: ${this.props.song.Title}`);
    }

    static transformLengthInMinute(length: number) {
        const minutes = parseInt(length / 60);
        const seconds = `${parseInt(length - minutes * 60)}`.padStart(2, "0");
        return `${minutes}:${seconds}`;
    }

    render() {
        const borderClass = this.props.isPlayingNow
            ? "border-light"
            : "border-dark";

        return (
            <div
                className={this.props.className}
                style={this.props.style}
                onMouseOver={() => this.onMouseOver()}
                onMouseOut={() => this.onMouseOut()}
            >
                <div
                    className={`card ${borderClass} rounded-0 bg-transparent`}
                    style={styles.container}
                >
                    <div className="card-body">
                        <div className="row text-light">
                            <div className="col-sm-10">
                                <h5 className="card-title">
                                    <div
                                        onClick={() => this.onPlayButtonClick()}
                                    >
                                        {this.state.mouseOver ? (
                                            <i
                                                className="fas fa-play mr-2"
                                                style={
                                                    styles.playButtonContainer
                                                }
                                            />
                                        ) : (
                                            <i
                                                className="fas fa-headphones mr-2"
                                                style={
                                                    styles.playButtonContainer
                                                }
                                            />
                                        )}
                                        {this.props.song.Title}
                                    </div>
                                </h5>
                            </div>
                            <div className="col-sm-2">
                                <div className="row">
                                    <div
                                        className="col-sm-4 p-0"
                                        onClick={() =>
                                            this.onOptionsButtonClick()
                                        }
                                    >
                                        <i
                                            className={
                                                "fas fa-ellipsis-h " +
                                                (this.state.mouseOver
                                                    ? "visible"
                                                    : "invisible")
                                            }
                                        />
                                    </div>
                                    <div className="col-sm-8 p-0">
                                        {SongListItem.transformLengthInMinute(
                                            parseFloat(this.props.song.Length)
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h6 className="card-subtitle">
                            {this.props.song.Artist} - {this.props.song.Album}
                        </h6>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongListItem);
