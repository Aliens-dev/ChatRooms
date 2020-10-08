import React from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from '../pages/app/NotFound';
import PrivateRoutes from "./PrivateRoutes";
import {
    PROFILE_PAGE,
    REGISTER_PAGE,
    ROOMS_PAGE,
    DASHBOARD_PAGE,
    LOGIN_PAGE,
    PUBLIC_ROOMS_PAGE, JOINED_ROOMS_PAGE
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

