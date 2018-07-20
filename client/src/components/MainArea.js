// @flow
import React, { Component } from "react";
import PlaylistInfo from './PlaylistInfo'
import SongList from "./SongList";
import Song from '../models/Song'

type Props = {
    className?: string,
    style?: Object
};

class MainArea extends Component<Props> {
    render() {
        // TODO: move to store
        const songs: Array<Song> = [
            Song.createFromJSONObject({
                "ID": "1",
                "ClassName": "Model\\Song",
                "LastEdited": "2018-07-18 21:03:40",
                "Created": "2018-07-18 21:03:40",
                "Title": "LAST STARDUST (Soundtrack Edit)",
                "Length": "259.27",
                "Artist": "Aimer",
                "Album": "Fate/stay night [Unlimited Blade Works] オリジナルサウンドトラック II",
                "Disc": 1,
                "Track": 24
            }),
            Song.createFromJSONObject({
                "ID": "2",
                "ClassName": "Model\\Song",
                "LastEdited": "2018-07-18 21:03:44",
                "Created": "2018-07-18 21:03:44",
                "Title": "Refrain",
                "Length": "532.90",
                "Artist": "Anan Ryoko",
                "Album": "Eternal Light",
                "Disc": 1,
                "Track": 7
            })
        ];

        return (
            <div className={this.props.className} style={this.props.style}>
                <div className="container-fluid">
                    <div className="row">
                        <PlaylistInfo className="col-sm-3"/>
                        <SongList className="col-sm-9" songs={songs}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainArea;
