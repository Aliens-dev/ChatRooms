import React from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoutes from "./PrivateRoutes";
import {
    REGISTER_PAGE,
    LOGIN_PAGE,
} from "../urls/AppBaseUrl";
import Index from '../pages/app/Index';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path={LOGIN_PAGE} exact component={Login} />
                <Route path={REGISTER_PAGE} exact component={Register} />
                <PrivateRoutes path="/" component={Index} />
            </Switch>
        </Router>
    )
}

export default Routes;

