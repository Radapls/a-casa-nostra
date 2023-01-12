/*
 * RADAPLS PROJECTS
 * ------------------
 * Copyright (C) 2023 Juan Felipe Rada - All Rights Reserved.
 *
 * This file, project or its parts can not be copied and/or distributed without
 * the express permission of Juan Felipe Rada.
 *
 * @file useAuthStatus.jsx
 * @author Juan Felipe Rada <radapls8@gmail.com>
 * @date Thursday, 12th January 2023
 */

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

export function useAuthStatus() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if(user){
                setLoggedIn(true)
            }
            setLoading(false)
        })
    }, [])
  return {loggedIn, loading}
}
