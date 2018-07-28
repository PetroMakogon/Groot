// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import AllSongs from "./MainArea/AllSongs";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import AllPlaylists from "./MainArea/AllPlaylists";
import PlaylistDetail from "./MainArea/PlaylistDetail";

type Props = {
    className?: string,
    style?: Object
};

class MainArea extends Component<Props> {
    render() {
        return (
            <div className={this.props.className} style={this.props.style}>
                <div className="container-fluid pt-3">
                    <Switch>
                        <Route
                            path="/all-songs"
                            render={() => {
                                return <AllSongs className={"row"} />;
                            }}
                        />
                        <Route
                            path="/playlists"
                            render={() => {
                                return <AllPlaylists className={"row"} />;
                            }}
                        />
                        <Route
                            path="/playlist/:id"
                            render={props => {
                                return (
                                    <PlaylistDetail
                                        className={"row"}
                                        playlistID={props.match.params.id}
                                    />
                                );
                            }}
                        />
                        <Redirect from="/" to="/all-songs" />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default withRouter(connect()(MainArea));
