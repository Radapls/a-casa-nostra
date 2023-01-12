/*
 * RADAPLS PROJECTS
 * ------------------
 * Copyright (C) 2023 Juan Felipe Rada - All Rights Reserved.
 *
 * This file, project or its parts can not be copied and/or distributed without
 * the express permission of Juan Felipe Rada.
 *
 * @file CreateListing.jsx
 * @author Juan Felipe Rada <radapls8@gmail.com>
 * @date Thursday, 12th January 2023
 */

import React, { useState } from 'react';

export default function CreateListing() {

    const [formData, serFormData] = useState({
        type: "rent",
        name: "",
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: "",
        description: "",
        offer: true,
        regularPrice: 0,
        discountedPrice: 0
    });

    const {type, name, bedrooms, bathrooms, parking, furnished, address, description, offer, regularPrice, discountedPrice} = formData;

    function onChange() {

    }

  return (
    <main className='max-w-md px-2 mx-auto'>
        <h1 className='text-3xl text-center mt-6 font-bold'>
            Create Listing
        </h1>
        <form>
            <p className='text-lg mt-6 font-semibold'>Sell / Rent</p>
            <div className='flex'>
                <button
                    type='button' id='type' value='sale'
                    onClick={onChange}
                    className={`mr-3 px-7 py-3 font-medium text-s uppercase shadow-md rounded-xl hover:shadow-lg transition duration-150 ease-in-out w-full ${type === "rent" ? "bg-white text-black" : "bg-slate-600 text-white"}`} >
                    Sell
                </button>
                <button
                    type='button' id='type' value='rent'
                    onClick={onChange}
                    className={`ml-3 px-7 py-3 font-medium text-s uppercase shadow-md rounded-xl hover:shadow-lg transition duration-150 ease-in-out w-full ${type === "sale" ? "bg-white text-black" : "bg-slate-600 text-white"}`} >
                    Rent
                </button>
            </div>

            <p className='text-lg mt-6 font-semibold'>Name</p>
            <input className='w-full  px-4 py-2  text-gr rounded-xl bg-white border border-gray-300 transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6' placeholder='Property name' type="text" value={name} id="name" onChange={onChange} maxLength='32' minLength='10' required/>

            <div className='flex space-x-6 mb-6'>
                <div>
                    <p className='text-lg font-semibold'> Beds</p>
                    <input
                        type="number"
                        id="bedrooms"
                        value={bedrooms}
                        onChange={onChange}
                        min="1"
                        max="50"
                        required
                        className='w-full text-center px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-xl transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600'/>
                </div>

                <div>
                    <p className='text-lg font-semibold'> Bathrooms</p>
                    <input
                        type="number"
                        id="bathrooms"
                        value={bathrooms}
                        onChange={onChange}
                        min="1"
                        max="50"
                        required
                        className='w-full text-center px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-xl transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600'/>
                </div>
            </div>

            <p className='text-lg mt-6 font-semibold'>Parking spots</p>
            <div className='flex'>
                <button
                    type='button' id='parking' value={true}
                    onClick={onChange}
                    className={`mr-3 px-7 py-3 font-medium text-s uppercase shadow-md rounded-xl hover:shadow-lg transition duration-150 ease-in-out w-full ${!parking ? "bg-white text-black" : "bg-slate-600 text-white"}`} >
                    Yes
                </button>
                <button
                    type='button' id='parking' value={false}
                    onClick={onChange}
                    className={`ml-3 px-7 py-3 font-medium text-s uppercase shadow-md rounded-xl hover:shadow-lg transition duration-150 ease-in-out w-full ${parking ? "bg-white text-black" : "bg-slate-600 text-white"}`} >
                    No
                </button>
            </div>


            <p className='text-lg mt-6 font-semibold'>Furnished</p>
            <div className='flex'>
                <button
                    type='button' id='furnished' value={true}
                    onClick={onChange}
                    className={`mr-3 px-7 py-3 font-medium text-s uppercase shadow-md rounded-xl hover:shadow-lg transition duration-150 ease-in-out w-full ${!furnished ? "bg-white text-black" : "bg-slate-600 text-white"}`} >
                    Yes
                </button>
                <button
                    type='button' id='furnished' value={false}
                    onClick={onChange}
                    className={`ml-3 px-7 py-3 font-medium text-s uppercase shadow-md rounded-xl hover:shadow-lg transition duration-150 ease-in-out w-full ${furnished ? "bg-white text-black" : "bg-slate-600 text-white"}`} >
                    No
                </button>
            </div>


            <p className='text-lg my-6 font-semibold'>Address</p>
            <textarea
                className='w-full px-4 py-2  text-gray rounded-xl bg-white border border-gray-300 transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6' placeholder='Address' type="text" value={address} id="address" onChange={onChange} required/>

            <p className='text-lg font-semibold'>Description</p>
            <textarea
                className='w-full px-4 py-2  text-gray rounded-xl bg-white border border-gray-300 transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6' placeholder='Description' type="text" value={description} id="description" onChange={onChange} required/>


            <p className='text-lg font-semibold'>Offer</p>
            <div className='flex mb-6'>
                <button
                    type='button' id='offer' value={true}
                    onClick={onChange}
                    className={`mr-3 px-7 py-3 font-medium text-s uppercase shadow-md rounded-xl hover:shadow-lg transition duration-150 ease-in-out w-full ${!offer ? "bg-white text-black" : "bg-slate-600 text-white"}`} >
                    Yes
                </button>
                <button
                    type='button' id='offer' value={false}
                    onClick={onChange}
                    className={`ml-3 px-7 py-3 font-medium text-s uppercase shadow-md rounded-xl hover:shadow-lg transition duration-150 ease-in-out w-full ${offer ? "bg-white text-black" : "bg-slate-600 text-white"}`} >
                    No
                </button>
            </div>


                <div className='flex mb-6 space-x-6'>
                <div>
                    <p className='text-lg font-semibold'> Regular price</p>

                    <div>
                    <input
                        type="number"
                        id="regularPrice"
                        value={regularPrice}
                        onChange={onChange}
                        min="50"
                        max="4000000"
                        required
                        className='w-full text-center px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-xl transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600'/>
                        {type === "rent" && (
                            <div className=''>
                                <p className='text-md w-full whitespace-nowrap font-semibold'>
                                $ / Month
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                </div>
                {offer  && (
                    <div>
                    <p className='text-lg font-semibold'> Discount price</p>
                    <input
                        type="number"
                        id="discountedPrice"
                        value={discountedPrice}
                        onChange={onChange}
                        min="50"
                        max="4000000"
                        required={offer}
                        className='w-full text-center px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-xl transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600'/>
                            {type === "rent" && (
                            <div className=''>
                                <p className='text-md w-full whitespace-nowrap font-semibold'>
                                $ / Month
                                </p>
                            </div>
                        )}
                    </div>
            )}

            <div className='mb-6'>
                <p className='text-lg font-semibold'>Images</p>
                <p className='text-gray-600'>The first image will be the cover (max 6)</p>

                <input type="file" id="images" onChange={onChange} accept='.jpg, .png, .jpeg' className='w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded-xl transition duration-150 ease-in-out focus:bg-white focus:border-slate-600 file:bg-gray-700 file:text-white file:text-xs file:font-semibold file:rounded-lg file:p-3 file:uppercase file:border-none'/>
            </div>

            <button type="submit" className='mb-6 w-full px-7 py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'>Create Listing</button>


        </form>
    </main>
  )
}
