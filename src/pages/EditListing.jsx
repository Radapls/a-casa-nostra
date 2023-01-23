/*
 * RADAPLS PROJECTS
 * ------------------
 * Copyright (C) 2023 Juan Felipe Rada - All Rights Reserved.
 *
 * This file, project or its parts can not be copied and/or distributed without
 * the express permission of Juan Felipe Rada.
 *
 * @file EditListing.jsx
 * @author Juan Felipe Rada <radapls8@gmail.com>
 * @date Monday, 23rd January 2023
 */

import React from 'react';


import { getAuth } from "firebase/auth";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from "uuid";
import Spinner from '../components/Spinner';
import { db } from "../firebase";

export default function EditListing() {

    const navigate = useNavigate();
    const auth = getAuth()
    const [geolocationEnabled, setGetlocationEnabled] = useState(true);
    const [loading, setLoading] = useState(false)
    const [listing, setListing] = useState(null)
    const [formData, setFormData] = useState({
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
        discountedPrice: 0,
        latitude: 0,
        longitude: 0,
        images: {}
    });

    const params = useParams()

    useEffect(() => {
        if(listing && listing.userRef !== auth.currentUser.uid){
          toast.error("You can't not edit this listing")
          navigate("/")
        }

      }, [auth.currentUser.uid, listing, navigate])

    useEffect(() => {
        setLoading(true);
        async function fetchListing() {
            const docRef = doc(db, "listings", params.listingId);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists())
            {
                setListing(docSnap.data());
                setFormData({...docSnap.data()});
                setLoading(false);
            } else{
                navigate("/");
                toast.error("Listing does not exist")
            }
        }
        fetchListing();
    }, [navigate, params.listingId])

    const {
        type,
        name,
        bedrooms,
        bathrooms,
        parking,
        furnished,
        address,
        description,
        offer,
        regularPrice,
        discountedPrice,
        latitude,
        longitude,
        images
    } = formData;

    function onChange(e) {
        let boolean = null;
        if(e.target.value === "true"){
            boolean = true;
        }
        if(e.target.value === "false"){
            boolean = false;
        }
        if (e.target.files) {
            setFormData((prevState) => ({
              ...prevState,
              images: e.target.files,
            }));
          }
          if (!e.target.files) {
            setFormData((prevState) => ({
              ...prevState,
              [e.target.id]: boolean ?? e.target.value,
            }));
          }
    };

    async function onSubmit(e) {
        e.preventDefault();
        setLoading(true);

        if(+discountedPrice >= +regularPrice){
            setLoading(false)
            toast.error('Discounted prices needs to be less than regular price')
            return;
        }

        if(images.length > 6){
            setLoading(false)
            toast.error('Maximum 6 images are allowed')
            return;
        }

        let geoLocation = {};
        let location;

        if(geolocationEnabled){
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`);

            const data = await response.json()

            console.log(data);

            geoLocation.lat = data.results[0]?.geometry.location.lat ?? 0;
            geoLocation.lng = data.results[0]?.geometry.location.lng ?? 0;

            location = data.status === "ZERO_RESULTS" && undefined;

            if(location === undefined){
                setLoading(false);
                toast.error('Please enter a correct address');
                return;
            }
        }else{
            geoLocation.lat = latitude;
            geoLocation.lng = longitude;
        }

        async function storeImage(image) {
            return new Promise((resolve, reject) => {
              const storage = getStorage();
              const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
              const storageRef = ref(storage, filename);
              const uploadTask = uploadBytesResumable(storageRef, image);
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  // Observe state change events such as progress, pause, and resume
                  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                  // eslint-disable-next-line default-case
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                  }
                },
                (error) => {
                  // Handle unsuccessful uploads
                  reject(error);
                },
                () => {
                  // Handle successful uploads on complete
                  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                  });
                }
              );
            });
          }

        const imgUrls = await Promise.all(
            [...images].map((image) => storeImage(image))
          ).catch((error) => {
            setLoading(false);
            toast.error("Images not uploaded");
            return;
          });

          const formDataCopy = {
            ...formData,
            imgUrls,
            geoLocation,
            timestamp: serverTimestamp(),
            userRef: auth.currentUser.uid,
          };
          delete formDataCopy.images;
          !formDataCopy.offer && delete formDataCopy.discountedPrice;
          delete formDataCopy.latitude;
          delete formDataCopy.longitude;
          const docRef = doc(db, "listings", params.listingId)

          await updateDoc(docRef, formDataCopy);
          setLoading(false);
          toast.success("Listing Edited");
          navigate(`/category/${formDataCopy.type}/${docRef.id}`);
    }

    if(loading){
        return <Spinner/>;
    }

  return (
    <main className='max-w-md px-2 mx-auto'>
        <h1 className='text-3xl text-center mt-6 font-bold'>
            Edit Listing
        </h1>
        <form onSubmit={onSubmit}>
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
            {!geolocationEnabled && (
                <div className='flex space-x-6 justify-start mb-6'>
                    <div>
                        <p className='text-lg font-semibold'> Latitude</p>
                        <input min='-90' max='90' className='w-full px-5 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-xl transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center' type="number"  id="latitude" value={latitude} onChange={onchange} required />
                    </div>
                    <div>
                        <p className='text-lg font-semibold'> Longitude</p>
                        <input min='-180' max='180' className='w-full px-5 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-xl transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center' type="number"  id="longitude" value={longitude} onChange={onchange} required />
                    </div>
                </div>
            )}
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

                <input type="file" id="images" onChange={onChange} accept='.jpg, .png, .jpeg' multiple required
                className='w-full text-gray-700 border-gray-300 rounded-xl font-semibold
                transition duration-150 ease-in-out focus:bg-white focus:border-slate-600 text-sm text-grey-500
                file:mr-5 file:py-2 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-medium
                file:bg-slate-600 file:text-white hover:file:cursor-pointer hover:file:bg-slate-800'/>
            </div>

            <button type="submit" className='mb-6 w-full px-7 py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'>Edit Listing</button>


        </form>
    </main>
  )
}
