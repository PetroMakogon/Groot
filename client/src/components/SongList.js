// @flow
import React, { Component } from "react";
import SongListItem from "./SongListItem";
import type { Song } from "../models/Song";

type Props = {
    className?: string,
    style?: Object,
    songs: Array<Song>
};

class SongList extends Component<Props> {
    render() {
        return (
            <div className={this.props.className} style={this.props.style}>
                {this.props.songs.map(song => {
                    return <SongListItem key={song.ID} song={song} />;
                })}
            </div>
        );
    }
}

export default SongList;
