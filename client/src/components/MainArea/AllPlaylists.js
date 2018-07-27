// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import type { Playlist } from "../../models/Playlist";
import PlaylistItem from '../Playlist/PlaylistItem'
import { loadAllPlaylistsAsync } from '../../actions/loadAllPlaylists'

type Props = {
  className?: string,
  style?: Object,
  playlists?: Array<Playlist>,
  loadAllPlaylists?: () => void
};

const mapStateToProps = state => {
  return {
    songs: state.allSongs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadAllPlaylists: () => {
      dispatch(loadAllPlaylistsAsync());
    }
  };
};

class AllPlaylist extends Component<Props> {
  componentDidMount() {
    if (this.props.loadAllPlaylists) {
      this.props.loadAllPlaylists();
    }
  }

  render() {
    const playlists = this.props.playlists || [];

    return (
      <div className={this.props.className} style={this.props.style}>
        {playlists.map(playlist => {
          return <PlaylistItem playlist={playlist} />
        })}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllPlaylist);
