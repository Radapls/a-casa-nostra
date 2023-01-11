/*
 * RADAPLS PROJECTS
 * ------------------
 * Copyright (C) 2023 Juan Felipe Rada - All Rights Reserved.
 *
 * This file, project or its parts can not be copied and/or distributed without
 * the express permission of Juan Felipe Rada.
 *
 * @file SignUp.jsx
 * @author Juan Felipe Rada <radapls8@gmail.com>
 * @date Monday, 9th January 2023
 */

import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ImageAuth from '../components/ImageAuth';
import OAuth from '../components/OAuth';
import { db } from '../firebase';

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email:"",
        password:""
    });

    const {name, email, password} = formData;

    const navigate = useNavigate();

    function onChange(e){
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    async function onSubmit(e) {
        e.preventDefault()

        try {
           const auth = getAuth();
           const userCredential = await createUserWithEmailAndPassword(auth, email, password);

           updateProfile(auth.currentUser, {
            displayName: name
           })

           const user = userCredential.user;
           const formDataCopy = {...formData};
           delete formDataCopy.password;
           formDataCopy.timestamp = serverTimestamp();

           await setDoc(doc(db, "users", user.uid), formDataCopy)
           toast.success("Sing Up was successful")
           navigate("/")
        }
        catch (error) {
            toast.error("Something went wrong with the registration")
        }
    }
  return (
    <section>
        <h1 className='text-3xl text-center mt-6 font-bold'>Sign Up</h1>
        <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>

            <ImageAuth/>

            <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
                <form onSubmit={onSubmit}>
                    <input
                        className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded-lg transition ease-in-out'
                        type="text"
                        id='name'
                        value={name}
                        onChange={onChange}
                        placeholder="Full name"/>

                    <input
                        className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded-lg transition ease-in-out'
                        type="email"
                        id='email'
                        value={email}
                        onChange={onChange}
                        placeholder="Email address"/>

                    <div className='relative mb-6'>
                        <input
                        className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded-lg transition ease-in-out'
                        type={showPassword ? "text" : "password"}
                        id='password'
                        value={password}
                        onChange={onChange}
                        placeholder="Password"/>
                        {showPassword ? (
                            <AiOutlineEyeInvisible
                                className="absolute right-3 top-3 text-xl cursor-pointer"
                                onClick={() => setShowPassword((prevState)  => !prevState)} />) : (
                            <AiOutlineEye
                                className="absolute right-3 top-3 text-xl cursor-pointer"
                                onClick={() => setShowPassword((prevState)  => !prevState)} />
                            )}
                    </div>

                    <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
                        <p className='mb-6'>Have a account?
                            <Link className='font-semibold text-red-600 hover:text-red-700 transition durations-200 ease-in-out ml-1' to={"/sign-in"}>Sign In</Link>
                        </p>

                        <p>
                            <Link className='font-semibold text-blue-600 hover:text-blue-800 transition durations-200 ease-in-out' to={"/forgot-password"}> Forgot password?</Link>
                        </p>
                    </div>

                    <button className='w-full bg-blue-600 text-white px-7 py-3 rounded-xl text-sm font-medium uppercase shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800' type="submit">Sign Up</button>

                    <div className='flex my-4 items-center before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300'>
                        <p className='text-center font-semibold mx-4'>OR</p>
                    </div>

                    <OAuth/>
                </form>

            </div>
        </div>
    </section>
  )
}
