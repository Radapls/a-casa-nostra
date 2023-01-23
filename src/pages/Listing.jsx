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

import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { IoMdShare } from "react-icons/io";
import { useParams } from 'react-router-dom';
import SwiperCore, { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import Spinner from "../components/Spinner";
import { db } from '../firebase';

export default function Listing() {
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shareLinkCopied, setShareLinkCopied] = useState(false);

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
            {shareLinkCopied && (
                <p className='fixed top-[23%] right-[11%] font-semibold border-2 border-gray-400 rounded-md bg-white z-10 p-2' >Link Copied!</p>
            )}
        </div>
    </main>
  )
}
