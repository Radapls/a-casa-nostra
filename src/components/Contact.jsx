/*
 * RADAPLS PROJECTS
 * ------------------
 * Copyright (C) 2023 Juan Felipe Rada - All Rights Reserved.
 *
 * This file, project or its parts can not be copied and/or distributed without
 * the express permission of Juan Felipe Rada.
 *
 * @file Contact.jsx
 * @author Juan Felipe Rada <radapls8@gmail.com>
 * @date Monday, 23rd January 2023
 */

import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { db } from '../firebase';

export default function Contact({userRef, listing}) {

    const [contact, setContact] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function getContact() {
            const docRef = doc(db, "users", userRef);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setContact(docSnap.data());
            } else{
                toast.error("Could not get landlord data");
            }
        }
        getContact();

    }, [userRef])


    function onChange(e) {
        setMessage(e.target.value);
    }

  return <>
  {contact !== null && (
    <div className='flex flex-col w-full' >
        <p>Contact {contact.name} for the {listing.name.toLowerCase()}</p>
        <div className='mt-3 mb-6'>
            <textarea
                className='w-full rounded-xl px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600'
                name="message"
                id="message"
                rows="2"
                value={message}
                onChange={onChange}></textarea>
        </div>
        <a href={`mailto:${contact.email}?Subject=${listing.name}&body${message}`}>
            <button
                className='px-7 py-3 bg-blue-600 text-white rounded-xl text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-xl font-semibold focus:bg-blue-700 focus:shadow-xl active:bg-blue-800 active:shadow-xl transition duration-150 ease-in-out w-full text-center mb-6' type='button'>Send message</button>
        </a>
    </div>
  )}

  </>

}
