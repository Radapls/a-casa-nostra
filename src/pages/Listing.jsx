/*
 * RADAPLS PROJECTS
 * ------------------
 * Copyright (C) 2023 Juan Felipe Rada - All Rights Reserved.
 *
 * This file, project or its parts can not be copied and/or distributed without
 * the express permission of Juan Felipe Rada.
 *
 * @file Listing.jsx
 * @author Juan Felipe Rada <radapls8@gmail.com>
 * @date Monday, 23rd January 2023
 */

import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FaParking } from "react-icons/fa";
import { GiBathtub, GiBed } from "react-icons/gi";
import { IoMdShare } from "react-icons/io";
import { MdChair, MdLocationOn } from "react-icons/md";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import SwiperCore, { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import Contact from '../components/Contact';
import Spinner from "../components/Spinner";
import { db } from '../firebase';


export default function Listing() {
    const auth = getAuth();
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shareLinkCopied, setShareLinkCopied] = useState(false);
    const [contact, setContact] = useState(false);

    SwiperCore.use([Autoplay, Navigation, Pagination])
    useEffect(() => {
      async function fetchListing() {
        const docRef = doc(db, "listings", params.listingId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setListing(docSnap.data());
          setLoading(false);
        }
      }
      fetchListing();
    }, [params.listingId]);
    if (loading) {
      return <Spinner />;
    }
    return (
    <main>
        <Swiper
            slidesPerView={1}
            navigation
            pagination={{ type: "progressbar" }}
            effect="fade"
            modules={[EffectFade]}
            autoplay={{delay: 3000}}
            >

            {listing.imgUrls.map((url, index) => (
            <SwiperSlide key={index} >
                <div
                    className='relative w-full overflow-hidden h-[400px]'
                    style={{background: `url(${listing.imgUrls[index]}) center no-repeat`,
                    backgroundSize: "cover"}}>

                </div>
            </SwiperSlide>
            ))}
        </Swiper>
        <div
            onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                setShareLinkCopied(true)
                setTimeout(() => {
                    setShareLinkCopied(false)
                }, 2000);
            }}
            className="fixed top-[13%] right-[13%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center">
            <IoMdShare className='text-2xl text-slate-500' />
            </div>
            {shareLinkCopied && (
                <p className='fixed top-[23%] right-[11%] font-semibold border-2 border-gray-400 rounded-md bg-white z-10 p-2' >Link Copied!</p>
            )}

        <div className="m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5">
            <div className="w-full">
                <p className="text-2xl font-bold mb-3 text-blue-900 ">
                    {listing.name } - $ {""}
                    {listing.offer
                    ? listing.discountedPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : listing.regularPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        {listing.type === "rent" ? "/ month" : ""}
                </p>
                <p className='flex items-center mt-6 mb-3 font-semibold' >
                    <MdLocationOn className='text-green-700 mr-1' />
                    {listing.address}
                    </p>

                    <div className="flex justify-start items-center space-x-4 w-[75%]">
                        <p className='bg-red-800 w-full max-w-[200px] text-white rounded-md p-1 text-center font-semibold shadow-md'>
                            {listing.type === "rent" ? "Rent" : "Sale"}
                        </p>
                        {listing.offer && (
                        <p className="w-full max-w-[200px] bg-green-800 rounded-md p-1 text-white text-center font-semibold shadow-md">
                            ${(+listing.regularPrice - +listing.discountedPrice).toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} discount
                        </p>
                        )}
                    </div>
                    <p className='mt-3 mb-3'>
                        <span className='font-semibold'>Description - </span>
                         {listing.description}
                    </p>
                    <ul className='flex items-center space-x-2 sm:space-x-10 text-sm font-semibold mb-6'>
                        <li className="flex items-center whitespace-nowrap">
                        <GiBed className='text-lg mr-1'/>
                            {+listing.bedrooms > 1
                            ? `${listing.bedrooms} Beds`
                            :   "1 Bed"}
                        </li>
                        <li className="flex items-center whitespace-nowrap">
                        <GiBathtub className='text-lg mr-1'/>
                            {+listing.bathrooms > 1
                            ? `${listing.bathrooms} Baths`
                            :   "1 Bath"}
                        </li>
                        <li className="flex items-center whitespace-nowrap">
                        <FaParking className='text-lg mr-1'/>
                            {+listing.parking
                            ? "Parking spot"
                            :  "No parking"}
                        </li>
                        <li className="flex items-center whitespace-nowrap">
                        <MdChair className='text-lg mr-1'/>
                            {+listing.furnished
                            ? "Furnished"
                            :  "Not furnished"}
                        </li>
                    </ul>

                    {listing.userRef !== auth.currentUser?.uid && !contact && (
                    <div className="mt-6">
                        <button
                            onClick={() => setContact(true)}
                            className='px-7 py-3 bg-blue-600 rounded-xl text-white font-medium text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full text-center transition duration-150 ease-in-out'>
                                Contact Landlord
                        </button>
                    </div>
                    )}
                    {contact && (
                        <Contact
                            userRef={listing.userRef}
                            listing={listing} />
                    )}
            </div>
            <div className="w-full h-[200px] md:h-[400px] z-10 overflow-x-hidden mt-6 md:mt-0 md:ml-2 rounded-xl">
                <MapContainer
                    center={[listing.geoLocation.lat, listing.geoLocation.lng]}
                    zoom={13}
                    scrollWheelZoom={false}
                    style={{height: "100%", width: "100%"}}
                    >

                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                        <Marker
                            position={[listing.geoLocation.lat, listing.geoLocation.lng]}>
                        <Popup>
                       {listing.address}
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>

        </div>
    </main>
  )
}


// TODO: Create a map component outside the page