/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React from "react";

import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchuser, updatedata } from "@/action/useraction";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

const dashboard = () => {
  const { data: session } = useSession();
  const [form, setform] = useState({
    name: "",
    email: "",
    Username: "",
    profilepic: "",
    coverpic: "",
    razorpayid: "",
    razorpaysecret: "",
  });
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.push("/Login");
    } else {
      getdata();
    }
  }, [session, router]);


  

  const getdata = async () => {
    // if (!session || !session.user) {
    //   console.log("Session is not available");
    //   return;
    // }

    // try {
    let u = await fetchuser(session.user.name);
    setform(u);
    // } catch (error) {
    //   console.error("Error fetching user data:", error);
    // }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
    // console.log(form)
  };

  const handleSubmit = async (data) => {
    // console.log("Form Submitted:", { ...form });
    let a = await updatedata(form, session.user.name);
    console.log(a);
    if (a) {
      alert("profile not updated");
    } else {
      toast('profile Updated!', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
              });
              router.push(`/${session.user.name}`);
    }
  };

  return (
    <>
     <ToastContainer
             position="top-right"
                     autoClose={3000}
                     hideProgressBar={false}
                     newestOnTop={false}
                     closeOnClick
                     rtl={false}
                     pauseOnFocusLoss
                     draggable
                     pauseOnHover
                     theme="light"
                     transition={Bounce}  
                     />

          <ToastContainer/>
      <div className="w-full max-w-lg p-8 rounded-lg mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">
          Welcome to your Dashboard
        </h2>
        <form className="space-y-2" action={handleSubmit}>
          <div>
            <label className="block mb-1 capitalize">Name</label>
            <input
              type="text"
              value={form.name ? form.name : ""}
              onChange={handleChange}
              name="name"
              className="w-full p-1  bg-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 capitalize">Email</label>
            <input
              type="text"
              value={form.email ? form.email : ""}
              onChange={handleChange}
              name="email"
              className="w-full p-1  bg-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 capitalize">UserName</label>
            <input
              type="text"
              value={form.Username ? form.Username : ""}
              onChange={handleChange}
              name="Username"
              className="w-full p-1  bg-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 capitalize">Profile Picture</label>
            <input
              type="text"
              value={form.profilepic ? form.profilepic : ""}
              onChange={handleChange}
              name="profilepic"
              className="w-full p-1  bg-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 capitalize">Copver picture</label>
            <input
              type="text"
              value={form.coverpic ? form.coverpic : ""}
              onChange={handleChange}
              name="coverpic"
              className="w-full p-1  bg-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 capitalize">Reazerpay Id</label>
            <input
              type="text"
              value={form.razorpayid ? form.razorpayid : ""}
              onChange={handleChange}
              name="razorpayid"
              className="w-full p-1  bg-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 capitalize">Reazerpay Secret</label>
            <input
              type="text"
              value={form.razorpaysecret ? form.razorpaysecret : ""}
              onChange={handleChange}
              name="razorpaysecret"
              className="w-full p-1  bg-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="cursor-pointer w-full bg-blue-600 text-white rounded-lg my-2 p-1 hover:bg-blue-700 transition"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default dashboard;
