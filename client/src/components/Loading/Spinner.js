// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import type { RootState } from "../../reducers/root";
import "./Spinner.css";

const mapStateToProps = (state: RootState) => {
    return {
        loading: state.loading > 0
    };
};

const mapDispatchToProps = (dispatch: *, props: Props) => {
    return {};
};

type Props = {
    loading: boolean
};

class Spinner extends Component<Props> {
    render() {
        if (this.props.loading) {
            return (
                <div className="fixed-top w-100 h-100 d-flex justify-content-center align-items-center">
                    <div
                        className="fixed-top w-100 h-100 bg-light"
                        style={{ opacity: 0.5 }}
                        onClick={() => {
                            return false;
                        }}
                    />
                    <div className="spinner bg-dark" />
                </div>
            );
        }
        return null;
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Spinner);
