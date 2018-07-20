import React, { Component } from "react";
import "../css/bootstrap.min.css";
import Sidebar from "./components/Sidebar";
import MainArea from "./components/MainArea";

const styles = {
    mainContainer: {
        height: "100%"
    },
    bottomBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 50,
        background: '#ccc'
    }
};

class App extends Component {
    render() {
        return (
            <div className="container-fluid" style={styles.mainContainer}>
                <div className="row" style={styles.mainContainer}>
                    <Sidebar className="col-sm-2" />
                    <MainArea className="col-sm-10" />
                </div>

                <div style={styles.bottomBar}/>
            </div>
        );
    }
}

export default App;
