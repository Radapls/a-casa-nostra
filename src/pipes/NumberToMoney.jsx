/*
 * RADAPLS PROJECTS
 * ------------------
 * Copyright (C) 2023 Juan Felipe Rada - All Rights Reserved.
 *
 * This file, project or its parts can not be copied and/or distributed without
 * the express permission of Juan Felipe Rada.
 *
 * @file NumberToMoney.jsx
 * @author Juan Felipe Rada <radapls8@gmail.com>
 * @date Tuesday, 24th January 2023
 */

export function NumberToMoney(string) {
    return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
