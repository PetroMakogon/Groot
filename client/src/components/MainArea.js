// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import AllSongs from "./MainArea/AllSongs";
import { Route, Switch, withRouter } from "react-router-dom";
import AllPlaylists from "./MainArea/AllPlaylists";
import PlaylistDetail from "./MainArea/PlaylistDetail";
import LoginPage from "./MainArea/LoginPage";
import type { RootState } from "../reducers/root";
import type { User } from "../models/User";

type Props = {
    className?: string,
    style?: Object
} & {
    currentUser: User | null
};

const mapStateToProps = (state: RootState) => {
    return {
        currentUser: state.userState.user
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
                <Route
                    path="/login"
                    render={props => {
                        return <LoginPage className={"row"} />;
                    }}
                />
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
