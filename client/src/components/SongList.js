// @flow
import React, { Component } from "react";
import Song from '../models/Song'
import SongListItem from './SongListItem'

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
                    return <SongListItem key={song.ID} song={song}/>;
                })}
            </div>
        );
    }
}

export default SongList;
