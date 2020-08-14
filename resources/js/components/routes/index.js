import React from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Index from '../pages/app/Index';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/app" >
                    <Index />
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes;

