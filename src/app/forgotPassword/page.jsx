'use client';

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState} from 'react';
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState({
        email: ""
    });
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/forgotPassword", email);
            console.log("Email submitted successfully", response.data);
            toast.success("Email submitted successfully");
            router.push('./changePassword');
        } catch (error) {
            console.log("Signup failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(email.email.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [email]);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl">Forgot Password?</h1>
            <h1>{loading ? "Processing" : "Enter your email here"}</h1>
            <hr />
            {/* <label htmlFor="email">email</label> */}
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="text"
                value={email.email}
                onChange={(e) => setEmail({...email, email: e.target.value})}
                placeholder="email"
            />

            <button
                onClick={onSignup}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "No signup" : "Signup"}
            </button>

        </div>
    )
}