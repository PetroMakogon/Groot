// @flow
import React, { Component } from "react";
import Song from "../models/Song";

type Props = {
    className?: string,
    style?: Object,
    song: Song
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
    }
};

class NowPlayingItem extends Component<Props> {
    onOptionsButtonClick() {
        alert(`onOptionsButtonClick: ${this.props.song.Title}`);
    }

    render() {
        return (
            <div className={this.props.className} style={this.props.style}>
                <div className="media pt-3 pl-2 pr-2">
                    <div className="d-flex flex-column mr-3">
                        <div
                            className="d-flex justify-content-center align-items-center"
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

                    <div className="media-body">
                        <h5>{this.props.song.Title}</h5>
                        <h6>{this.props.song.Artist}</h6>
                        <h6>{this.props.song.Album}</h6>
                    </div>
                </div>
            </div>
        );
    }
}

export default NowPlayingItem;
