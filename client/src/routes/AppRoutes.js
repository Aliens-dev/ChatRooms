import React from 'react';
import {Switch, Route, useRouteMatch} from 'react-router-dom';
import Rooms from "../pages/app/Rooms";
import SingleRoom from "../pages/app/Room/SingleRoom";
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
            <Route path="/" exact component={Rooms} />
            <Route path={PUBLIC_ROOMS_PAGE} exact component={PublicRooms} />
            <Route path={JOINED_ROOMS_PAGE} exact component={JoinedRooms} />
            <Route path={PROFILE_PAGE} exact component={MyProfile} />
            <Route path={ROOMS_PAGE} exact component={Rooms} />
            <Route path={ROOMS_PAGE+'add'} component={AddRoom} />
            <Route path={ROOMS_PAGE+':id/edit'} component={EditRoom} />
            <Route path={ROOMS_PAGE+':id'} component={SingleRoom} />
            <Route path="*" component={NotFound}/>
        </Switch>
    )
}

export default AppRoutes;

