// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import type { RootState } from "../../reducers/root";

type Props = {
    className?: string,
    style?: Object
} & {
    login: (email: string, password: string) => void
};

type State = {
    email: string,
    password: string
};

const mapStateToProps = (state: RootState) => {
    return {};
};

const mapDispatchToProps = (dispatch: *, props: Props) => {
    return {
        login: (email: string, password: string) => {
            console.log(email, password);
        }
    };
};

class LoginPage extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    render() {
        return (
            <div className={this.props.className} style={this.props.style}>
                <form className="w-50">
                    <div className="form-group w-100">
                        <label className={"w-100"}>
                            Email address
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter email"
                                value={this.state.email}
                                onChange={e => {
                                    this.setState({
                                        email: e.target.value
                                    });
                                }}
                            />
                        </label>
                    </div>
                    <div className="form-group w-100">
                        <label className={"w-100"}>
                            Password
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={e => {
                                    this.setState({
                                        password: e.target.value
                                    });
                                }}
                            />
                        </label>
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            this.props.login(
                                this.state.email,
                                this.state.password
                            );
                        }}
                    >
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);
