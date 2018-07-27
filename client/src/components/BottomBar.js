// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import type { Song } from "../models/Song";
import { store } from "../store";
import { changePlayingNow } from "../actions/changePlayingNow";

type Props = {
    className?: string,
    style?: Object,
    playingNow?: Song | null
};

const mapStateToProps = state => {
    return {
        playingNow: state.playingNow
    };
};

class BottomBar extends Component<Props> {
    playNextSong() {
        const song = store.getState().playingNow;
        const playlist = store.getState().currentPlaylist;
        const currentIndex = playlist.Songs.indexOf(song);
        const nextIndex = currentIndex + 1;
        if (nextIndex >= playlist.Songs.length) return;
        const nextSong = playlist.Songs[nextIndex];
        store.dispatch(changePlayingNow(nextSong));
    }

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
                    onEnded={() => this.playNextSong()}
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

export default connect(mapStateToProps)(BottomBar);
