/**
 * RADAPLS PROJECTS
 * ------------------
 * Copyright (C) 2023 Juan Felipe Rada - All Rights Reserved.
 *
 * This file, project or its parts can not be copied and/or distributed without
 * the express permission of Juan Felipe Rada.
 *
 * @file firebase.js
 * @author Juan Felipe Rada <radapls8@gmail.com>
 * @date Tuesday, 10th January 2023
 */

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKAI5spYdlSMUydWqSFdBW2092-zXDkjs",
  authDomain: "real-estate-radapls.firebaseapp.com",
  projectId: "real-estate-radapls",
  storageBucket: "real-estate-radapls.appspot.com",
  messagingSenderId: "333502409417",
  appId: "1:333502409417:web:21d322d6135f693bef3b18"
};

initializeApp(firebaseConfig);

export const db = getFirestore();
