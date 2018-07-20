// @flow
import React, { Component } from "react";

type Props = {
    className?: string,
    style?: Object
};

class Sidebar extends Component<Props> {
    render() {
        return (
            <div className={this.props.className} style={this.props.style}>
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
                        Log Out
                    </button>
                </div>
            </div>
        );
    }
}

export default Sidebar;
