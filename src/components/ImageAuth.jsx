/*
 * RADAPLS PROJECTS
 * ------------------
 * Copyright (C) 2023 Juan Felipe Rada - All Rights Reserved.
 *
 * This file, project or its parts can not be copied and/or distributed without
 * the express permission of Juan Felipe Rada.
 *
 * @file ImageAuth.jsx
 * @author Juan Felipe Rada <radapls8@gmail.com>
 * @date Monday, 9th January 2023
 */

import React from 'react';

export default function ImageAuth() {
    return (
      <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6 object-contain'>
      <img
          draggable="false"
          className='w-full rounded-2xl'
          src={require('../assets/images/auth-image.png')} alt="Auth" />
  </div>
    )
  }
