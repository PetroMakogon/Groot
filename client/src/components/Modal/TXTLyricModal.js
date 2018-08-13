// @flow
import React, { Component } from "react";

type Props = {
    title: string,
    lyric: string,
    show: boolean,
    onCloseButtonClick: () => void
};

class TXTLyricModal extends Component<Props> {
    render() {
        if (!this.props.show) {
            return null;
        }

        return (
            <div
                className="modal d-flex justify-content-center align-items-center"
                tabIndex="-1"
                style={{ background: "#ffffff7F", marginBottom: 50 }}
            >
                <div className="modal-dialog w-75 h-75">
                    <div className="modal-content h-100">
                        <div className="modal-header">
                            <h5 className="modal-title">{this.props.title}</h5>
                            <button
                                type="button"
                                className="close"
                                onClick={() => this.props.onCloseButtonClick()}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div
                            className="modal-body h-100"
                            style={{ overflow: "scroll" }}
                        >
                            {this.props.lyric.split("\n").map((line, idx) => {
                                return <p key={idx}>{line}</p>;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TXTLyricModal;
