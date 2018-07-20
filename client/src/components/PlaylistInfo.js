// @flow
import React, { Component } from "react";

type Props = {
    className?: string,
    style?: Object,
};

class PlaylistInfo extends Component<Props> {
    render() {
        return (
            <div className={this.props.className} style={this.props.style}>

            </div>
        );
    }
}

export default PlaylistInfo;
