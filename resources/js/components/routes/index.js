import React from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Index from '../pages/app/Index';
import PrivateRoutes from "./PrivateRoutes";

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <PrivateRoutes path="/app" component={Index} />
            </Switch>
        </Router>
    )
}

export default Routes;

