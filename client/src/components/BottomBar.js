// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import type { Song } from "../models/Song";
import { store } from "../store";
import { changePlayingNow } from "../actions/changePlayingNow";
import type { RootState } from "../reducers/root";
import { loadAllPlaylistsAsync } from "../actions/loadAllPlaylists";
import type { CurrentPlaylistState } from "../reducers/currentPlaylist";
import type { PlayingNowState } from "../reducers/playingNow";

type Props = {
    className?: string,
    style?: Object,
    playingNow?: PlayingNowState,
    currentPlaylist?: CurrentPlaylistState,
    playNextSong?: () => void
};

const mapStateToProps = (state: RootState) => {
    return {
        playingNow: state.playingNow,
        currentPlaylist: state.currentPlaylist
    };
};

const mapDispatchToProps = (dispatch: *, props: Props) => {
    return {
        playNextSong: () => {
            const song = props.playingNow;
            const playlist = props.currentPlaylist;
            const songs = playlist ? playlist.Songs || [] : [];

            const currentIndex = songs.indexOf(song);
            const nextIndex = currentIndex + 1;
            if (nextIndex >= songs.length) return;
            const nextSong = songs[nextIndex];
            dispatch(changePlayingNow(nextSong));
        }
    };
};

class BottomBar extends Component<Props> {
    render() {
        const playingNow = this.props.playingNow || null;
        const url =
            (playingNow &&
                playingNow.StreamFile &&
                playingNow.StreamFile.url) ||
            null;
        const source = url ? <source src={url} type="audio/mp3" /> : null;

        return (
            <div className={this.props.className} style={this.props.style}>
                {/*{https://github.com/facebook/react/issues/9447}*/}
                <audio
                    key={url}
                    className="w-100 h-100"
                    controls="controls"
                    autoPlay
                    onEnded={() => {
                        if (this.props.playNextSong) {
                            this.props.playNextSong();
                        }
                    }}
                >
                    {source}
                </audio>
                {/*<button><i className="fas fa-step-backward"/></button>*/}
                {/*<button><i className="fas fa-play"/></button>*/}
                {/*<button><i className="fas fa-step-forward"/></button>*/}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BottomBar);
