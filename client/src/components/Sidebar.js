// @flow
import React, { Component } from "react";
import NowPlayingItem from "./NowPlayingItem";
import { NavLink } from "react-router-dom";

type Props = {
    className?: string,
    style?: Object
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

class Sidebar extends Component<Props> {
    render() {
        // noinspection HtmlUnknownTarget
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
                </div>
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
                    <a
                        className="btn list-group-item list-group-item-action"
                        href="/Security/Logout"
                    >
                        Log Out
                    </a>
                </div>

                <NowPlayingItem style={styles.nowPlayingItem} />
            </div>
        );
    }
}

export default Sidebar;
