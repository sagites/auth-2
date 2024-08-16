'use client';

import axios from 'axios';
import React, { useEffect, useState} from 'react';
import Link from "next/link";
import bcryptjs from "bcryptjs";
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'


export default function ChangePasswordPage() {
    const [token, setToken] = useState("");
    const [user, setUser] = useState({
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const router = useRouter();

    useEffect( () => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || '');
    },[]);

    useEffect( () => {
        if (token > 0) {
            verifyUserEmail();
        }
    }, [token]);

    const onReset = async () => {
        try {
            setLoading(true);
            const hashedPassword = await bcryptjs.hash(user.password, 10);

            const response = await axios.post("/api/users/changePassword", {
                token,
                password: hashedPassword,
            });
            console.log(response.data);
            toast.success("Password Changed Successfully");
            router.push("/login");
        } catch (error) {
            toast.error("Password Change Unsuccessful")
        } finally {
            setLoading(false);
        }
    }

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/changePassword', {token});
            setVerified(true);
        } catch (error) {
            setError(true);
            console.log(error.response.data);
        }
    };

    return (
        <div className='text-white flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className="text-4xl">Change Password</h1>
            <h2 className="p-2 m-2 bg-orange-500 text-black">{token ? `${token}` : "Invalid token"}</h2>

            { (
                <div className='flex flex-col items-center justify-center'>
                    <h2 className="text-2xl"></h2>
                    <label htmlFor="password">Password:</label>
                    <input
                        className="p-2 border ml-3 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                        id="password"
                        type="text"
                        value={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                        placeholder="password"
                    />

                    <button
                        className='bg-orange-500 rounded p-3 hover:text-black'
                        onClick={onReset}
                        >
                        Change Password
                    </button>
                </div>
            ) }
        </div>
    )
 };