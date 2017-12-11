import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "./configs/store";
import { App } from "./components/App";
import "./index.scss";

let store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('app'));
