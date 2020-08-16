import React from 'react';
import {Switch, Route, useRouteMatch} from 'react-router-dom';
import Rooms from "../pages/app/Rooms";
import SingleRoom from "../pages/app/SingleRoom";
import Dashboard from "../pages/app/Dashboard";

const AppRoutes = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route path={path} exact component={Dashboard}/>
            <Route path={path+'/rooms'} exact component={Rooms} />
            <Route path={path+'/rooms/:id'} component={SingleRoom} />
        </Switch>
    )
}

export default AppRoutes;

