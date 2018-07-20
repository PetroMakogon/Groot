// @flow
import React, { Component } from "react";
import NowPlayingItem from "./NowPlayingItem";
import Song from "../models/Song";

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
        height: 160,
        width: "100%",
        background: "#555"
    }
};

class Sidebar extends Component<Props> {
    render() {
        // TODO: move to store
        const song = Song.createFromJSONObject({
            ID: "2",
            ClassName: "Model\\Song",
            LastEdited: "2018-07-18 21:03:44",
            Created: "2018-07-18 21:03:44",
            Title: "Refrain",
            Length: "532.90",
            Artist: "Anan Ryoko",
            Album: "Eternal Light",
            Disc: 1,
            Track: 7
        });

        return (
            <div
                className={
                    `p-0 ` +
                    `${this.props.className ? this.props.className : ""}`
                }
                style={Object.assign(styles.wrap, this.props.style)}
            >
                <div className="mb-2" style={{ height: 50 }}>
                    <h3>Groot</h3>
                </div>
                <div className="list-group list-group-flush">
                    <button
                        type="button"
                        className="list-group-item list-group-item-action active"
                    >
                        All Songs
                    </button>
                    <button
                        type="button"
                        className="list-group-item list-group-item-action"
                    >
                        Playlist
                    </button>
                    <button
                        type="button"
                        className="list-group-item list-group-item-action"
                    >
                        Admin
                    </button>
                    <button
                        type="button"
                        className="list-group-item list-group-item-action"
                    >
                        Log Out
                    </button>
                </div>

                <NowPlayingItem song={song} style={styles.nowPlayingItem} />
            </div>
        );
    }
}

export default Sidebar;
