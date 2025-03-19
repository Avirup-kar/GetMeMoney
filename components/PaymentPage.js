/* eslint-disable @next/next/inline-script-id */

"use client";

import React, { use, useEffect } from "react";
import Script from "next/script";
import { useState } from "react";
import { fetchuser, fetchpayment, initiate } from "@/action/useraction";
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import { useSession, signIn, signOut } from "next-auth/react";
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { useRouter } from 'next/navigation'

const PaymentPage = ({ Username }) => {
  const [paymetform, setpaymetform] = useState({
    name: "",
    message: "",
    amount: "",
  });
  const { data: session } = useSession();
  const [curentuser, setcurentuser] = useState({});
  const [payments, setpayments] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter()

  const handelChange = (e) => {
    setpaymetform({ ...paymetform, [e.target.name]: e.target.value });
  };

  //  useEffect(() => {
  //     if (!session) {
  //       router.push("/Login");
  //     } 
  //   }, [session, router]);

  useEffect(() => {
    getdata();
  }, []);

  useEffect(() => {
    if (searchParams.get("paymentdone") === "true") {
      toast('Thanks for your donation!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    router.push(`/${Username}`);
}, [searchParams, router])

  const getdata = async () => {
    let u = await fetchuser(Username);
    setcurentuser(u);
    let p = await fetchpayment(Username);
    // console.log(u, p);
    setpayments(p);
  };

  const pay = async (amount) => {
   if(paymetform.amount === "0"){
     alert("you can pay minimum ₹1")
   }
   else{
    let a = await initiate(amount, Username, paymetform);
    let orderId = a.id;
    var options = {
      key: curentuser.razorpayid, // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "get me mony", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
    setpaymetform({ name: "", message: "", amount: "" });
  };
  };

  return (
    <>
      <ToastContainer
        position="top-right"
                autoClose={5000}
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
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className="relative">
        <img
          className="object-cover text-center bg-gray-500 w-full h-[150px] md:h-[250px] border-b-2 border-gray-400"
          src={curentuser.coverpic}
          alt="Cover pic"
        />
        <div className="flex justify-center items-center">
          <img
            className="absolute rounded-3xl text-center border-2 bg-gray-600 border-gray-400 bottom-[-50px]  md:bottom-[-65px] w-[100px] h-[100px] md:w-[130px] md:h-[130px]"
            src={curentuser.profilepic}
            alt="Profile pic"
          />
        </div>
      </div>

      <div className="mt-20 text-3xl flex justify-center items-center flex-col z-10 gap-3">
        <div className="text-[25px] text-white font-semibold px-2 text-center">
          @{curentuser.Username}
        </div>
        <div className="text-[15px] text-gray-300 px-2 text-center">
          Let help {curentuser.name} to get Fund
        </div>
        <div className="text-[15px] text-gray-300 px-2 text-center">
          {payments.length} payments . ₹{payments.reduce((a,b)=> a+b.amount, 0)} has raised
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3 justify-center w-[85%] mx-auto py-10">
        <div className="w-full md:w-1/2 h-[350px] bg-gray-900 opacity-75 p-3 rounded-lg">
          <h1 className="text-2xl text-gray-300 font-semibold text-center p-3 ">
            Supporters
          </h1>
          <div className="p-5 overflow-auto custom-scrollbar h-[270px]">
            <ul className="flex flex-col gap-3">
              {payments.length === 0 && (
                <li className="text-gray-300 text-center">
                  No one has donated yet
                </li>
              )}
              {payments.map((p, i) => {
                return (
                  <li
                    className={`flex gap-2 items-center`}
                    key={i}
                  >
                    <img
                      className="w-[25px] bg-gray-600 p-0.5 rounded-2xl"
                      src="user.gif"
                      alt=""
                    />
                    <span>
                      {p.name} doneted <b>₹{p.amount}</b> with massage &quot;
                      {p.message}&ldquo;
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="w-full md:w-1/2 min-h-[350px] bg-gray-900 opacity-75 rounded-lg p-3">
          <h1 className="text-2xl text-gray-300 font-semibold text-center p-3">
            Make Payment
          </h1>
          <div>
            <form className="flex flex-col gap-4">
              <input
                onChange={handelChange}
                value={paymetform.name}
                name="name"
                type="text"
                placeholder="Enter Name"
                className="w-full p-2 bg-gray-700 text-gray-300 outline-none rounded-lg"
              />
              <input
                onChange={handelChange}
                value={paymetform.message}
                name="message"
                type="text"
                placeholder="Enter Massage"
                className="w-full p-2 bg-gray-700 text-gray-300 outline-none rounded-lg"
              />
              <input
                onChange={handelChange}
                value={paymetform.amount}
                name="amount"
                type="number"
                placeholder="Enter Amount"
                className="w-full p-2 bg-gray-700 text-gray-300 outline-none rounded-lg"
              />
              <button
                type="button"
                onClick={() => pay(Number.parseInt(paymetform.amount) * 100)}
                className="text-white w-full bg-gradient-to-br cursor-pointer from-purple-600 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 disabled:from-purple-500 disabled:to-blue-500 text-center me-2"
                disabled={paymetform.name.length < 3 || paymetform.amount.length < 1}>
                Pay
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="text-white bg-gradient-to-br from-purple-600 to-blue-900 cursor-pointer hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center"
                  onClick={() => pay(1000)}
                >
                  Pay ₹10
                </button>
                <button
                  type="button"
                  className="text-white bg-gradient-to-br from-purple-700 to-blue-900 cursor-pointer hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center"
                  onClick={() => pay(2000)}
                >
                  Pay ₹20
                </button>
                <button
                  type="button"
                  className="text-white bg-gradient-to-br from-purple-600 to-blue-900 cursor-pointer hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center"
                  onClick={() => pay(3000)}
                >
                  Pay ₹30
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
