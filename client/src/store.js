// @flow

import { applyMiddleware, createStore } from "redux";
import { root } from "./reducers/root";
import thunk from "redux-thunk";

export const store = createStore(root, applyMiddleware(thunk));
