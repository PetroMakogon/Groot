// @flow
import React, { Component } from "react";
import type { Song } from "../../models/Song";
import { connect } from "react-redux";

type Props = {
    className?: string,
    style?: Object,
    song?: Song
};

const styles = {
    container: {
        width: "100%"
    },
    imageBox: {
        width: 50,
        height: 50,
        background: "#CCC"
    },
    imageIcon: {
        fontSize: "32px"
    },
    infoBox: {
        overflow: "hidden"
    }
};

const mapStateToProps = state => {
    return {
        song: state.playingNowState.song
    };
};

class NowPlayingItem extends Component<Props> {
    onOptionsButtonClick() {}

    render() {
        const song = this.props.song || null;

        if (!song) return null;

        return (
            <div className={this.props.className} style={this.props.style}>
                <div className="media pt-3 pl-2 pr-2">
                    <div className="d-flex flex-column mr-3">
                        <div
                            className="d-flex justify-content-center align-items-center bg-light text-dark"
                            style={styles.imageBox}
                        >
                            <i
                                className="fas fa-music"
                                style={styles.imageIcon}
                            />
                        </div>
                        <div
                            className="d-flex justify-content-center align-items-center"
                            onClick={() => this.onOptionsButtonClick()}
                        >
                            <h5>...</h5>
                        </div>
                    </div>

                    <div className="media-body" style={styles.infoBox}>
                        <h5 className="text-truncate">{song.Title}</h5>
                        <h6 className="text-truncate">{song.Artist}</h6>
                        <h6 className="text-truncate">{song.Album}</h6>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(NowPlayingItem);
