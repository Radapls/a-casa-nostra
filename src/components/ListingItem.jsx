/*
 * RADAPLS PROJECTS
 * ------------------
 * Copyright (C) 2023 Juan Felipe Rada - All Rights Reserved.
 *
 * This file, project or its parts can not be copied and/or distributed without
 * the express permission of Juan Felipe Rada.
 *
 * @file ListingItem.jsx
 * @author Juan Felipe Rada <radapls8@gmail.com>
 * @date Monday, 23rd January 2023
 */

import React from 'react';
import { MdDelete, MdEdit, MdLocationOn } from "react-icons/md";
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { NumberToMoney } from '../pipes/NumberToMoney';

export default function ListingItem({listing, id, onEdit, onDelete}) {
  return (
    <li className='bg-white flex flex-col justify-between items-center shadow-sm hover:shadow-xl rounded-xl overflow-hidden transition-shadow duration-150 m-[10px] relative' >
        <Link className='contents' to={`/category/${listing.type}/${id}`}>
            <img className='h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in'
                loading='lazy'
                src={listing.imgUrls[0]}
                alt="" />
            <Moment className='absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-xl' fromNow>

                {listing.timestamp?.toDate()}
            </Moment>
            <div className='w-full p-[10px]' >
                <div className='flex items-center space-x-1' >
                    <MdLocationOn className='h-4 w-4 text-green-600' />
                    <p className='font-semibold text-sm mb-[2px] text-gray-600 truncate' >{listing.address}</p>
                </div>
                <p className='font-semibold mt-2 text-xl m-0 truncate' >{listing.name}</p>
                <p className='text-[#457b9d] mt-2 font-semibold'>$
                    {listing.offer
                    ? NumberToMoney(listing.discountedPrice)

                    : NumberToMoney(listing.regularPrice)
                    }
                    {listing.type === "rent" && "/ month"}
                </p>
                <div className='flex items-center mt-[10px] space-x-3' >
                    <div className='flex items-center space-x-1'>
                        <p className='font-bold text-xs' >{listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 bed"}</p>
                    </div>
                    <div className='flex items-center space-x-1'>
                        <p className='font-bold text-xs' >{listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 bath"}</p>
                    </div>
                </div>
            </div>
        </Link>
        {onDelete && (
            <MdDelete className='absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-500'
                onClick={() => onDelete(listing.id)}
                />
        )}
        {onEdit && (
            <MdEdit className='absolute bottom-2 right-7 h-[14px] cursor-pointer text-black'
                onClick={() => onEdit(listing.id)}
                />
        )}
    </li>
  )
}
