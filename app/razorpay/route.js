import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import connectDB from "@/db/conectdb";
import User from "@/models/user";
import Razorpay from "razorpay";


export const POST = async (req) => {
    await connectDB()
    let body = await req.formData()
    body = Object.fromEntries(body)

    let p = await Payment.findOne({oid: body.razorpay_order_id})
    if(!p){
        return NextResponse.json({success:"false", message:"orderId not found"})
    }
 
     const user = await User.findOne({Username: p.to_user})
     const Secret = user.razorpaysecret
     

    // verify the payment
    let xx = validatePaymentVerification({"order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id}, body.razorpay_signature, Secret)
    
    if(xx){
       const updatePayment = await Payment.findOneAndUpdate({oid: body.razorpay_order_id}, {done:"true"}, {new:true})
       return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatePayment.to_user}?payment=successfull`)
    }
    else{
        return NextResponse.json({success:"false",message:"payment Verification failed"})
    }
}