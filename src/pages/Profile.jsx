/*
 * RADAPLS PROJECTS
 * ------------------
 * Copyright (C) 2023 Juan Felipe Rada - All Rights Reserved.
 *
 * This file, project or its parts can not be copied and/or distributed without
 * the express permission of Juan Felipe Rada.
 *
 * @file Profile.jsx
 * @author Juan Felipe Rada <radapls8@gmail.com>
 * @date Monday, 9th January 2023
 */

import { getAuth, updateProfile } from 'firebase/auth';
import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FcHome } from 'react-icons/fc';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ListingItem from '../components/ListingItem';
import { db } from '../firebase';

export default function Profile() {

    const auth = getAuth();
    const navigate = useNavigate();

    const [changeDetails, setChangeDetails] = useState(false);
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        profilePic: auth.currentUser.photoURL
    });

    function onLogOut() {
        auth.signOut()
        navigate("/")
    };

    const {name, email, profilePic} = formData

    function onChange(e) {
        setFormData((prevState)=> ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    };

    async function  onSubmit() {
        try {
            if(auth.currentUser.displayName !== name){
                // Update display name in firebase auth

                await updateProfile(auth.currentUser, {
                    displayName: name
                });

                // Update name in the firestore

                const docRef = doc(db, "users", auth.currentUser.uid)
                await updateDoc(docRef, {name});
            }

            toast.success("Profile details update")

        } catch (error) {
          toast.error("Could not update the profile detail")
        }
    }

    useEffect(() => {
        async function fetchUserListings() {
            const listingRef = collection(db, "listings");
            const q = query(
                listingRef,
                where("userRef", "==", auth.currentUser.uid),
                orderBy("timestamp", "desc")
            );
            const querySnap = await getDocs(q);
            let listings = [];
            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
            setListings(listings)
            setLoading(false)
        }
        fetchUserListings();
    }, [auth.currentUser.uid])

    async function onDelete(listingId) {
        if(window.confirm("Are you sure? you want to delete?"))
        {
            await  deleteDoc(doc(db, "listings", listingId))
            const updatedListings = listings.filter((listing) => listing.id !== listingId);
            setListings(updatedListings)
            toast.success("Successfully deleted the listing")
        }
    }

    function onEdit(listingId) {
        navigate(`/edit-listing/${listingId}`)
    }

    return (
    <>
    <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
        <h1 className='text-3xl text-center font-bold mt-6'>My Profile</h1>
        <div className='w-full md:w-[50%] mt-6 px-3'>
            <form>

                <div className='flex justify-center items-center mb-6'>
                    <img className='rounded-[50%] sm:w-[100px] md:w-[150px] lg:w-[250px] xl:w-[250px]'
                        src={profilePic} alt="" />
                </div>

                <input
                    type="text"
                    id='name'
                    value={name}
                    disabled={!changeDetails}
                    onChange={onChange}
                    className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-lg transition ease-in-out ${changeDetails && "bg-red-200 focus:bg-red-200" }`}
                />

                <input
                    type="text"
                    id='email'
                    value={email}
                    disabled
                    className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-lg transition ease-in-out'
                />

                <div className='mb-6 flex justify-between whitespace-nowrap text-sm sm:text-lg'>
                    <p className='flex items-center'>Do you want to change your name?
                        <span
                            onClick={() => {
                                changeDetails && onSubmit();
                                setChangeDetails((prevState) => !prevState);
                                }}
                            className='font-semibold text-red-600 hover:text-red-800 transition ease-in-out duration-200 ml-1 cursor-pointer'>
                               {changeDetails ? "Apply change" : "Edit"}
                               </span>
                    </p>

                    <p onClick={onLogOut} className='text-blue-600 hover:text-blue-800 font-semibold transition ease-in-out cursor-pointer'>Sign Out</p>
                </div>
            </form>
            <button type="submit" className='w-full bg-blue-600 rounded-xl text-white uppercase px-7 py-3 text-sm font-semibold shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'>
                <Link to="/create-listing" className='flex justify-center items-center '>
                <FcHome className='mr-2 text-3xl bg-red-200 rounded-full p-1 border-2'/>
                Sell or rent your home
                </Link>
            </button>
        </div>
    </section>

    <div className='max-w-6xl px-3 mt-6 mx-auto'>
        {!loading && listings.length > 0 && (
            <>
            <h2 className='text-2xl text-center font-semibold mb-6 mt6'>My Listing</h2>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6 mb-6' >
                {listings.map((listing)=>(
                    <ListingItem
                        key={listing.id}
                        id={listing.id}
                        listing={listing.data}
                        onDelete={() => onDelete(listing.id)}
                        onEdit={() => onEdit(listing.id)}
                        />
                ))}
            </ul>
            </>
        )}
    </div>
    </>
  )
}
