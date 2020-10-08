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
import PrivateRoutes from "./PrivateRoutes";
import {DASHBOARD_PAGE, JOINED_ROOMS_PAGE, PROFILE_PAGE, PUBLIC_ROOMS_PAGE, ROOMS_PAGE} from "../urls/AppBaseUrl";

const AppRoutes = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <PrivateRoutes path={DASHBOARD_PAGE} exact component={Dashboard}/>
            <PrivateRoutes path={PUBLIC_ROOMS_PAGE} exact component={PublicRooms} />
            <PrivateRoutes path={JOINED_ROOMS_PAGE} exact component={JoinedRooms} />
            <PrivateRoutes path={PROFILE_PAGE} exact component={MyProfile} />
            <PrivateRoutes path={ROOMS_PAGE} exact component={Rooms} />
            <PrivateRoutes path={ROOMS_PAGE+'add'} component={AddRoom} />
            <PrivateRoutes path={ROOMS_PAGE+':id/edit'} component={EditRoom} />
            <PrivateRoutes path={ROOMS_PAGE+':id'} component={SingleRoom} />
            <PrivateRoutes path="*" component={NotFound}/>
        </Switch>
    )
}

export default AppRoutes;

