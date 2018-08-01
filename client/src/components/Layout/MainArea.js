// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import AllSongsPage from "../../pages/AllSongsPage";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import AllPlaylistsPage from "../../pages/AllPlaylistsPage";
import PlaylistDetailPage from "../../pages/PlaylistDetailPage";
import LoginPage from "../../pages/LoginPage";
import type { RootState } from "../../reducers/root";
import type { User } from "../../models/User";
import PlaylistEditPage from "../../pages/PlaylistEditPage";

type Props = {
    className?: string,
    style?: Object
} & {
    currentUser: User | null
};

const mapStateToProps = (state: RootState) => {
    return {
        currentUser: state.user.user
    };
};

const mapDispatchToProps = (dispatch: *, props: Props) => {
    return {};
};

class MainArea extends Component<Props> {
    render() {
        let routes = (
            <Switch>
                <Route
                    path="/all-songs"
                    render={() => {
                        return <AllSongsPage className={"row"} />;
                    }}
                />
                <Route
                    path="/playlists/new"
                    render={props => {
                        return <PlaylistEditPage className={"row"} />;
                    }}
                />
                <Route
                    path="/playlists"
                    render={() => {
                        return <AllPlaylistsPage className={"row"} />;
                    }}
                />
                <Route
                    path="/playlist/:id"
                    render={props => {
                        return (
                            <PlaylistDetailPage
                                className={"row"}
                                playlistID={props.match.params.id}
                            />
                        );
                    }}
                />
                <Route
                    path="/login"
                    render={props => {
                        return <LoginPage className={"row"} />;
                    }}
                />
                <Redirect from="/" to="/login" />
            </Switch>
        );

        return (
            <div className={this.props.className} style={this.props.style}>
                <div className="container-fluid pt-3 h-100">{routes}</div>
            </div>
        );
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(MainArea)
);
