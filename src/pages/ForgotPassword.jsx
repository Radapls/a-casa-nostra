/*
 * RADAPLS PROJECTS
 * ------------------
 * Copyright (C) 2023 Juan Felipe Rada - All Rights Reserved.
 *
 * This file, project or its parts can not be copied and/or distributed without
 * the express permission of Juan Felipe Rada.
 *
 * @file ForgotPassword.jsx
 * @author Juan Felipe Rada <radapls8@gmail.com>
 * @date Monday, 9th January 2023
 */

import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ImageAuth from '../components/ImageAuth';
import OAuth from '../components/OAuth';

export default function ForgotPassword() {
    const [email, setEmail] = useState("");

    function onChange(e){
        setEmail(e.target.value);
    }

    async function onSubmit(e) {
        e.preventDefault();

        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email)
            toast.success("Email was send")
        } catch (error) {
            toast.error("Could not send reset password")
        }
    }

  return (
    <section>
        <h1 className='text-3xl text-center mt-6 font-bold'>Forgot Password</h1>
        <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>

        <ImageAuth/>

            <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
                <form onSubmit={onSubmit}>
                    <input
                        className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded-lg transition ease-in-out'
                        type="email"
                        id='email'
                        value={email}
                        onChange={onChange}
                        placeholder="Email address"/>

                    <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
                        <p className='mb-6'>Don't have a account?
                            <Link className='font-semibold text-red-600 hover:text-red-700 transition durations-200 ease-in-out ml-1' to={"/sign-up"}>Register</Link>
                        </p>

                        <p>
                            <Link className='font-semibold text-blue-600 hover:text-blue-800 transition durations-200 ease-in-out' to={"/sign-in"}> Sign in instead</Link>
                        </p>
                    </div>

                    <button className='w-full bg-blue-600 text-white px-7 py-3 rounded-xl text-sm font-medium uppercase shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800' type="submit">Send reset password</button>

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
