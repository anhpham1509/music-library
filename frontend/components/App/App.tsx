import * as React from "react";
import { Route, Router } from "react-router-dom";
import { history } from "../../configs/browser";
import { PrivateRoute } from "../PrivateRoute";
import { ConnectedNavBar } from "../NavBar";
import "./App.scss";
import { ConnectedRegisterPage } from "../RegisterPage";
import { ConnectedLoginPage } from "../LoginPage";
import { ConnectedHomePage } from "../HomePage";

const App = () => {
    return (
        <Router history={history}>
            <div className="main">
                <ConnectedNavBar />
                <PrivateRoute exact path="/" component={ConnectedHomePage} />
                <Route path="/login" component={ConnectedLoginPage} />
                <Route path="/register" component={ConnectedRegisterPage} />
            </div>
        </Router>
    );
};

export { App };