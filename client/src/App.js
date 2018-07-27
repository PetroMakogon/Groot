import React, { Component } from "react";
import Sidebar from "./components/Sidebar";
import MainArea from "./components/MainArea";
import BottomBar from "./components/BottomBar";

const styles = {
    mainContainer: {
        paddingBottom: 54
    },
    mainArea: {
        overflowY: "scroll"
    },
    bottomBar: {
        bottom: 0,
        left: 0,
        height: 54
    }
};

class App extends Component {
    render() {
        return (
            <div className="container-fluid h-100" style={styles.mainContainer}>
                <div className="row h-100">
                    <Sidebar className="col-sm-2" />
                    <MainArea
                        className="col-sm-10 h-100"
                        style={styles.mainArea}
                    />
                </div>

                <BottomBar
                    className="w-100 bg-light position-absolute"
                    style={styles.bottomBar}
                />
            </div>
        );
    }
}

export default App;
