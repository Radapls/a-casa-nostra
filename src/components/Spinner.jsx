/*
 * RADAPLS PROJECTS
 * ------------------
 * Copyright (C) 2023 Juan Felipe Rada - All Rights Reserved.
 *
 * This file, project or its parts can not be copied and/or distributed without
 * the express permission of Juan Felipe Rada.
 *
 * @file Spinner.jsx
 * @author Juan Felipe Rada <radapls8@gmail.com>
 * @date Thursday, 12th January 2023
 */

import React from 'react';
import { GridLoader } from 'react-spinners';

export default function Spinner(loading) {

    const color = "rgb(37 99 235)";

    return (
      <div className="bg-black bg-opacity-50 flex items-center justify-center fixed left-0 right-0 bottom-0 top-0 z-50">
        <GridLoader
          color={color}
          loading={loading}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
          speedMultiplier={1}
        />
      </div>
    );
  }
