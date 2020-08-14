import React from 'react';
import {Switch, Route, useRouteMatch} from 'react-router-dom';
import Rooms from "../pages/app/Rooms";
import SingleRoom from "../pages/app/SingleRoom";
import PrivateRoutes from './PrivateRoutes';

const AppRoutes = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <PrivateRoutes path={path+'/rooms'} exact component={Rooms} />
            <PrivateRoutes path={path+'/rooms/:id'} component={SingleRoom} />
        </Switch>
    )
}

export default AppRoutes;

