import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter, HashRouter } from 'react-router-dom'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename="/main">
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);
