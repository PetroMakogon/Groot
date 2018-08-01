// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import type { Playlist } from "../../models/Playlist";
import { Link } from "react-router-dom";
import { loadPlaylistDetailAsync } from "../../actions/Playlist/loadPlaylistDetail";

type Props = {
    className?: string,
    style?: Object
};

const mapStateToProps = (state, props: Props) => {
    return {};
};

const mapDispatchToProps = (dispatch: *, props: Props) => {
    return {};
};

class PlaylistItemAdd extends Component<Props> {
    render() {
        return (
            <div className={this.props.className} style={this.props.style}>
                <div
                    className={`card border-light rounded-0 bg-transparent w-100`}
                >
                    <div className="card-img-top">
                        <div className="d-flex justify-content-center align-items-center m-auto bg-dark text-light w-100">
                            <h3 className="p-3">
                                <i className="fas fa-plus" />
                            </h3>
                        </div>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">
                            <Link to={`/playlists/new`}>Add new playlist</Link>
                        </h5>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlaylistItemAdd);
