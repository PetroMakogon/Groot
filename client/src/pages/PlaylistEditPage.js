// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import type { Playlist } from "../models/Playlist";
import type { RootState } from "../reducers/root";
import { createPlaylistAsync } from "../actions/Playlist/createPlaylistAsync";

type Props = {
    className?: string,
    style?: Object,
    playlist?: Playlist,
    createPlaylist: (title: string, description: string) => void,
    editPlaylist: (playlist: Playlist) => void
};

const mapStateToProps = (state: RootState) => {
    return {};
};

type State = {
    title: string,
    description: string
};

const mapDispatchToProps = dispatch => {
    return {
        createPlaylist: (title: string, description: string) => {
            dispatch(createPlaylistAsync(title, description));
        },
        editPlaylist: (playlist: Playlist) => {
            // TODO: dispatch action
        }
    };
};

class PlaylistEditPage extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: ""
        };
    }

    onSaveButtonPressed() {
        if (this.props.playlist) {
            this.props.editPlaylist(this.props.playlist);
        } else {
            this.props.createPlaylist(this.state.title, this.state.description);
        }
    }

    render() {
        const pageTitle = this.props.playlist
            ? "Edit Playlist"
            : "Create Playlist";

        return (
            <div className={this.props.className} style={this.props.style}>
                <div className="w-50">
                    <h5>{pageTitle}</h5>
                    <div className="form-group w-100">
                        <label className={"w-100"}>
                            Title
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Title"
                                required
                                value={this.state.title}
                                onChange={e => {
                                    this.setState({
                                        title: e.target.value
                                    });
                                }}
                            />
                        </label>
                    </div>
                    <div className="form-group w-100">
                        <label className={"w-100"}>
                            Description
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Description"
                                value={this.state.description}
                                onChange={e => {
                                    this.setState({
                                        description: e.target.value
                                    });
                                }}
                            />
                        </label>
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={() => this.onSaveButtonPressed()}
                    >
                        Save
                    </button>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlaylistEditPage);
