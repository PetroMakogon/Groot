// @flow
import React, { Component } from "react";
import NowPlayingItem from "../Song/NowPlayingItem";
import { NavLink, withRouter } from "react-router-dom";
import type { RootState } from "../../reducers/root";
import { logout } from "../../actions/User/logout";
import type { User } from "../../models/User";
import { connect } from "react-redux";
import StorageService from "../../services/StorageService";

type Props = {
    className?: string,
    style?: Object
} & {
    currentUser: User | null,
    logout: () => void
};

const styles = {
    wrap: {
        background: "#282828",
        height: "100%"
    },
    nowPlayingItem: {
        position: "absolute",
        bottom: 0,
        left: 0,
        height: 110,
        width: "100%",
        background: "#555"
    }
};

const mapStateToProps = (state: RootState) => {
    return {
        currentUser: state.userState.user
    };
};

const mapDispatchToProps = (dispatch: *, props: Props) => {
    return {
        logout: () => {
            StorageService.removeUser();
            dispatch(logout());
            window.location.href = "/main";
        }
    };
};

class Sidebar extends Component<Props> {
    render() {
        let navigation = null;
        if (this.props.currentUser) {
            // noinspection HtmlUnknownTarget
            navigation = (
                <div className="list-group list-group-flush">
                    <NavLink
                        to="/all-songs"
                        className="list-group-item list-group-item-action"
                    >
                        All Songs
                    </NavLink>
                    <NavLink
                        to="/playlists"
                        className="list-group-item list-group-item-action"
                    >
                        Playlist
                    </NavLink>
                    <a
                        className="btn list-group-item list-group-item-action"
                        href="/admin"
                        target="_blank"
                    >
                        Admin
                    </a>
                    <button
                        className="btn list-group-item list-group-item-action"
                        onClick={() => {
                            this.props.logout();
                        }}
                    >
                        Log Out
                    </button>
                </div>
            );
        } else {
            navigation = (
                <div className="list-group list-group-flush">
                    <NavLink
                        to="/login"
                        className="list-group-item list-group-item-action"
                    >
                        Log In
                    </NavLink>
                </div>
            );
        }

        return (
            <div
                className={
                    `p-0 ` +
                    `${this.props.className ? this.props.className : ""}`
                }
                style={Object.assign(styles.wrap, this.props.style)}
            >
                <div className="container mb-2 mt-3">
                    <h3>Groot</h3>
                    <p>
                        {this.props.currentUser
                            ? "Welcome, " + this.props.currentUser.Email
                            : null}
                    </p>
                </div>
                {navigation}

                <NowPlayingItem style={styles.nowPlayingItem} />
            </div>
        );
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Sidebar)
);
