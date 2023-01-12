/*
 * RADAPLS PROJECTS
 * ------------------
 * Copyright (C) 2023 Juan Felipe Rada - All Rights Reserved.
 *
 * This file, project or its parts can not be copied and/or distributed without
 * the express permission of Juan Felipe Rada.
 *
 * @file Header.jsx
 * @author Juan Felipe Rada <radapls8@gmail.com>
 * @date Monday, 9th January 2023
 */

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

export default function Header() {
    const [pageState, setPageState] = useState("Sign In")

    const location = useLocation();
    const navigate = useNavigate();
    const auth = getAuth()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                setPageState("Profile")
            } else
            {
                setPageState("Sign In")
            }
        });
    })

    function pathMatchRoute(route){
        if(route === location.pathname){
            return true
        }
    }
  return (
    <div className='bg-white border-b shadow-sm sticky top-0 z-50'>
        <header className='flex justify-between items-center px-3 pt-2 max-w-6xl mx-auto'>
            <div>
                <img
                    onClick={() => navigate("/")}
                    className="h-12 cursor-pointer"
                    draggable="false"
                    src="https://tributaryre.com/wp-content/uploads/2021/08/tributary-mountains-01.png" alt="Logo" />
            </div>
            <div>
                <ul className='flex space-x-10'>
                    <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[4px] border-b-transparent
                    ${pathMatchRoute('/') && "text-black border-b-red-500"}`
                    }
                    onClick={() => navigate("/")}>Home</li>

                    <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[4px] border-b-transparent
                    ${pathMatchRoute('/offers') && "text-black border-b-red-500"}`}
                    onClick={() => navigate("/offers")}>Offers</li>

                    <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[4px] border-b-transparent
                    ${(pathMatchRoute('/sign-in')  || pathMatchRoute("/profile")) && "text-black border-b-red-500"}`}
                    onClick={() => navigate("/profile")}>{pageState}</li>
                </ul>
            </div>
        </header>
    </div>
  )
}
