"use server"

import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDB from "@/db/conectdb"
import User from "@/models/user"


export const initiate = async (amount, to_username, Paymentform) =>{
    await connectDB()

     const user = await User.findOne({Username: to_username})
     const Secret = user.razorpaysecret

var instance = new Razorpay({ key_id: user.razorpayid, key_secret: Secret,});

let options = {
    amount: Number.parseInt(amount),  // amount in the smallest currency unit
    currency: "INR",
};

let x = await instance.orders.create(options)
await Payment.create({oid: x.id, amount: amount/100, to_user: to_username, name: Paymentform.name, message: Paymentform.message})

return x
}

export const fetchuser = async (Username) => {
    await connectDB()
    let u = await User.findOne({Username: Username})
    let user = u.toObject({flattendObjectIds: true})
    return JSON.parse(JSON.stringify(user))
}

export const fetchpayment = async (Username) => {
    await connectDB()
    let p = await Payment.find({to_user: Username, done: true}).sort({amount: -1}).lean()
    return JSON.parse(JSON.stringify(p))
}

export const updatedata = async (data, oldUsername) => {
    await connectDB()
    let ndata = Object.fromEntries(Object.entries(data))
    console.log("the data is", ndata)
    if(oldUsername !== ndata.Username){
        let u = await User.findOne({Username: ndata.Username})
        if(u){
            return {message: "Username already taken"}
    }
    await User.updateOne({email: ndata.email}, ndata)
    await Payment.updateMany({to_user: oldUsername}, {to_user: ndata.Username})
    }
    else{
        await User.updateOne({email: ndata.email}, ndata)
    }
        
}