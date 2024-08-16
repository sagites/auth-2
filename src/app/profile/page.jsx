'use client';
import  axios  from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {toast} from "react-hot-toast";
import Link from "next/link"
import {NextResponse} from 'next/server'


export default function ProfilePage() {

    const router = useRouter();
    const [data, setData] = useState('nothing');

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(`/api/users/user`);
            console.log(res.data);
            setData(res.data.data.username);
          } catch (error) {
            console.error('Error fetching user details:', error);
            // Optionally display an error message on the UI using toast or another method
          }
        };

        fetchData(); // Call the function to fetch data on component mount
      }, []);

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success("Logout successful");
            router.push('/login')
        } catch (error) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <h2 className="p-1 rounded bg-green-500">{<Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr />
            <button
                className="text-white bg-red-400 hover:bg-red-800 font-bold py-2 px-4 rounded"
                onClick={logout}>
                Logout
            </button>

            {/* <button
                className="text-white bg-green-400 hover:bg-green-800 font-bold  mt-2 py-2 px-4 rounded"
                >
                Get Data
            </button> */}
        </div>
    )
}