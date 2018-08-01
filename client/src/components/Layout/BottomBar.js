// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { changePlayingNow } from "../../actions/Song/changePlayingNow";
import type { RootState } from "../../reducers/root";
import type { PlayingNowState } from "../../reducers/playingNowState";
import type { Song } from "../../models/Song";

type Props = {
    className?: string,
    style?: Object
} & {
    playingNow: PlayingNowState,
    playNextSong: (song: Song, queue: Array<Song>) => void
};

const mapStateToProps = (state: RootState) => {
    return {
        playingNow: state.playingNowState
    };
};

const mapDispatchToProps = (dispatch: *) => {
    return {
        playNextSong: (song: Song, queue: Array<Song>) => {
            const currentIndex = queue.indexOf(song);
            const nextIndex = currentIndex + 1;
            if (nextIndex >= queue.length) return;
            const nextSong = queue[nextIndex];
            dispatch(changePlayingNow(nextSong, queue));
        }
    };
};

class BottomBar extends Component<Props> {
    render() {
        const song = this.props.playingNow.song || null;
        const url = (song && song.StreamFile && song.StreamFile.url) || null;
        const source = url ? <source src={url} type="audio/mp3" /> : null;

        return (
            <div className={this.props.className} style={this.props.style}>
                <audio
                    key={
                        url /*{https://github.com/facebook/react/issues/9447}*/
                    }
                    className="w-100 h-100"
                    controls="controls"
                    autoPlay
                    onEnded={() => {
                        const song = this.props.playingNow.song;
                        const queue = this.props.playingNow.queue || [];
                        if (song) {
                            this.props.playNextSong(song, queue);
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
