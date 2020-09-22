import React from 'react';
import {Switch, Route, useRouteMatch} from 'react-router-dom';
import Rooms from "../pages/app/Rooms";
import SingleRoom from "../pages/app/Room/SingleRoom";
import Dashboard from "../pages/app/Dashboard";
import PublicRooms from "../pages/app/PublicRooms";
import JoinedRooms from "../pages/app/JoinedRooms";
import NotFound from "../pages/app/NotFound";
import MyProfile from "../pages/app/MyProfile";
import EditRoom from "../pages/app/Room/EditRoom";
import AddRoom from "../pages/app/Room/AddRoom";

const AppRoutes = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route path={path} exact component={Dashboard}/>
            <Route path={path+'/rooms'} exact component={Rooms} />
            <Route path={path+'/public-rooms'} exact component={PublicRooms} />
            <Route path={path+'/joined-rooms'} exact component={JoinedRooms} />
            <Route path={path+'/profile'} exact component={MyProfile} />
            <Route path={path+'/rooms/:id/edit'} component={EditRoom} />
            <Route path={path+'/rooms/add'} component={AddRoom} />
            <Route path={path+'/rooms/:id'} component={SingleRoom} />
            <Route path="*" component={NotFound}/>
        </Switch>
    )
}

export default AppRoutes;

