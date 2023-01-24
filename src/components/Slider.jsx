/*
 * RADAPLS PROJECTS
 * ------------------
 * Copyright (C) 2023 Juan Felipe Rada - All Rights Reserved.
 *
 * This file, project or its parts can not be copied and/or distributed without
 * the express permission of Juan Felipe Rada.
 *
 * @file Slider.jsx
 * @author Juan Felipe Rada <radapls8@gmail.com>
 * @date Tuesday, 24th January 2023
 */

import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SwiperCore, { Autoplay, EffectFade, Navigation, Pagination } from 'swiper';
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import { db } from '../firebase';
import { NumberToMoney } from '../pipes/NumberToMoney';
import Spinner from './Spinner';

export default function Slider() {
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true );

    SwiperCore.use([Autoplay, Navigation, Pagination])

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchListings() {
            const listingRef = collection(db, "listings");
            const q = query(listingRef, orderBy("timestamp", "desc"), limit(5));
            const querySnap = await getDocs(q);
            let listings = [];
            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            setListings(listings);
            setLoading(false);
        }
        fetchListings();
    }, []);

    if (loading) {
        return <Spinner/>;
    }
    if(listings.length === 0){
        return <></>;
    }

    return (
        listings && (
            <>
            <Swiper
                slidesPerView={1}
                navigation
                pagination={{ type: "progressbar" }}
                effect="fade"
                modules={[EffectFade]}
                autoplay={{ delay: 3000 }}>

          {listings.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}>
            <div
                style={{
                  background: `url(${data.imgUrls[0]}) center, no-repeat`,
                  backgroundSize: "cover",
                }}
                className="relative w-full h-[300px] overflow-hidden">
            </div>
            <p className='text-[#f1faee] absolute left-1 top-3 font-semibold max-w-[90%] bg-[#457b9d] shadow-lg rounded-md p-2 opacity-90'>
                {data.name}</p>
            <p className='text-[#f1faee] absolute left-1 bottom-1 font-bold max-w-[90%] bg-[#e63946] shadow-lg rounded-tr-3xl p-2 opacity-90' >
                ${NumberToMoney(data.discountedPrice ?? data.regularPrice)}
                {data.type === "rent" && "/ month"}
                </p>
            </SwiperSlide>
            ))}
            </Swiper>
        </>
    )
    )
}
