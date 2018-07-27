// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import AllSongs from "./MainArea/AllSongs";
import { Route, Switch, withRouter } from 'react-router-dom'

type Props = {
    className?: string,
    style?: Object
};

class MainArea extends Component<Props> {
    render() {
        return (
            <div className={this.props.className} style={this.props.style}>
                <div className="container-fluid">
                    <Switch>
                        <Route
                            path="/all-songs"
                            render={() => {
                                return <AllSongs className={"row"} />;
                            }}
                        />
                      <Route
                        path="/playlist"
                        render={() => {
                          return <div>/playlist</div>;
                        }}
                      />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default withRouter(connect()(MainArea));
