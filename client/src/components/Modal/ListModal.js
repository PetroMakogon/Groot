// @flow
import React, { Component } from "react";

type Item = {
    title: string,
    onClick: () => void
};

type Props = {
    title: string,
    items: Array<Item>,
    show: boolean,
    onCloseButtonClick: () => void
};

class ListModal extends Component<Props> {
    render() {
        if (!this.props.show) {
            return null;
        }

        return (
            <div
                className="modal d-flex justify-content-center align-items-center"
                tabIndex="-1"
                style={{ background: "#ffffff7F" }}
            >
                <div className="modal-dialog w-50">
                    <div className="modal-content">
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
                        <div className="modal-body">
                            <div className="list-group list-group-flush">
                                {this.props.items.map((item, index) => {
                                    return (
                                        <button
                                            key={index}
                                            type="button"
                                            className="list-group-item list-group-item-action"
                                            onClick={() => item.onClick()}
                                        >
                                            {item.title}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListModal;
