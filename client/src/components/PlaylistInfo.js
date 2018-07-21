// @flow
import React, { Component } from "react";
import type { Playlist } from '../models/Playlist'

type Props = {
    className?: string,
    style?: Object,
    playlist: Playlist
};

const styles = {
    imageBox: {
        width: 100,
        height: 100,
    },
    imageIcon: {
        fontSize: "32px"
    }
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
                        <h6 className="card-subtitle">
                            {songs.length} songs
                        </h6>
                        <p className="card-text">
                            {this.props.playlist.Description}
                        </p>
                        <button className="btn btn-primary btn-lg rounded-0 w-100">
                            Play
                        </button>
                        <br />
                        <button className="btn bg-transparent rounded-0 mt-3 text-light">
                            <i className="fas fa-ellipsis-h" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default PlaylistInfo;
