// @flow
import React, { Component } from "react";

type Props = {
    className?: string,
    style?: Object
};

class BottomBar extends Component<Props> {
    render() {
        return (
            <div className={this.props.className} style={this.props.style}>
                <audio className="w-100 h-100" controls="controls">
                    <source
                        src="https://www.w3schools.com/html/horse.mp3"
                        type="audio/wav"
                    />
                </audio>
                {/*<button><i className="fas fa-step-backward"/></button>*/}
                {/*<button><i className="fas fa-play"/></button>*/}
                {/*<button><i className="fas fa-step-forward"/></button>*/}
            </div>
        );
    }
}

export default BottomBar;
