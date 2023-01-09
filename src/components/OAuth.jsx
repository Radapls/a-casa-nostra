/*
 * RADAPLS PROJECTS
 * ------------------
 * Copyright (C) 2023 Juan Felipe Rada - All Rights Reserved.
 *
 * This file, project or its parts can not be copied and/or distributed without
 * the express permission of Juan Felipe Rada.
 *
 * @file OAuth.jsx
 * @author Juan Felipe Rada <radapls8@gmail.com>
 * @date Monday, 9th January 2023
 */

import React from 'react'
import { FcGoogle } from 'react-icons/fc'

export default function OAuth() {
  return (
    <button className='flex items-center justify-center w-full uppercase bg-red-700 text-white px-7 py-3 text-sm font-medium hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out rounded-xl'>
            <FcGoogle className='text-2xl bg-white rounded-full mr-2'/>
            Continue with Google</button>
  )
}
