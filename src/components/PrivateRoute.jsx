/*
 * RADAPLS PROJECTS
 * ------------------
 * Copyright (C) 2023 Juan Felipe Rada - All Rights Reserved.
 *
 * This file, project or its parts can not be copied and/or distributed without
 * the express permission of Juan Felipe Rada.
 *
 * @file PrivateRoute.jsx
 * @author Juan Felipe Rada <radapls8@gmail.com>
 * @date Thursday, 12th January 2023
 */

import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuthStatus } from '../hooks/useAuthStatus';
import Spinner from './Spinner';

export default function PrivateRoute() {
    const {loggedIn, loading} = useAuthStatus();

    if(loading){
        return <Spinner loading={loading}/>
    }
  return loggedIn ? <Outlet/> : <Navigate to="/sign-in"/>
}
