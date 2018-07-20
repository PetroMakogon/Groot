// @flow
import React, { Component } from "react";
import Song from "../models/Song";

type Props = {
    className?: string,
    style?: Object,
    song: Song
};

type State = {
    mouseOver: boolean
};

const styles = {
    container: {
        width: "100%"
    },
    playButtonContainer: {
        width: 22,
        height: 22
    }
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
        alert(`onPlayButtonClick: ${this.props.song.Title}`);
    }

    onOptionsButtonClick() {
        alert(`onOptionsButtonClick: ${this.props.song.Title}`);
    }

    render() {
        return (
            <div
                className={this.props.className}
                style={this.props.style}
                onMouseOver={() => this.onMouseOver()}
                onMouseOut={() => this.onMouseOut()}
            >
                <div className="card border-dark" style={styles.container}>
                    <div className="card-body">
                        <div className="row ml-auto">
                            <div className="row col-sm-10">
                                <div
                                    className="mr-1"
                                    style={styles.playButtonContainer}
                                    onClick={() => this.onPlayButtonClick()}
                                >
                                    {this.state.mouseOver ? (
                                        <i className="fas fa-play" />
                                    ) : (
                                        <i className="fas fa-headphones" />
                                    )}
                                </div>
                                <h5 className="card-title">
                                    {this.props.song.Title}
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
                                        {this.state.mouseOver ? "..." : ""}
                                    </div>
                                    <div className="col-sm-8 p-0">
                                        {this.props.song.Length}
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

export default SongListItem;
