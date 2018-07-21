// @flow
import React, { Component } from "react";
import PlaylistInfo from "./PlaylistInfo";
import SongList from "./SongList";
import { store } from "../store";
import { loadAllSongsAsync } from "../actions/loadAllSongs";
import type { Song } from "../models/Song";
import type { Playlist } from "../models/Playlist";
import { connect } from 'react-redux'

type Props = {
    className?: string,
    style?: Object,
    songs?: Array<Song>
};

const mapStateToProps = state => {
    return {
        songs: state.allSongs
    };
};

class MainArea extends Component<Props> {
    componentDidMount() {
        store.dispatch(loadAllSongsAsync());
    }

    render() {
        const songs: Array<Song> = this.props.songs || [];

        let playlist: Playlist = {
            ID: "1",
            ClassName: "Model\\Playlist",
            LastEdited: "2018-07-18 23:48:20",
            Created: "2018-07-18 23:48:20",
            Title: "My Playlist",
            Description: "The first playlist",
            NumberOfSongs: 2,
            Songs: []
        };

        return (
            <div className={this.props.className} style={this.props.style}>
                <div className="container-fluid">
                    <div className="row">
                        <PlaylistInfo
                            className="col-sm-3"
                            playlist={playlist}
                        />
                        <SongList className="col-sm-9" songs={songs} />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(MainArea);
