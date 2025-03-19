import React from 'react'
// import Image from 'next/image'
import PaymentPage from '@/components/PaymentPage'
import { notFound } from "next/navigation"
import connectDB from '@/db/conectdb'
import User from '@/models/user'

const Username = async ({params}) => {

  const checkUser = async () => {
    await connectDB()
    let u = await User.findOne({ Username: params.Username })
    if (!u) {
      return notFound()
    }
  }
  await checkUser()



  return (
    <>
   <PaymentPage Username={params.Username}/>
    </>
  )
}

export async function generateMetadata({ params }) {
  return {
    title: `${params.Username} - Get Me Money`,
  }
}

export default Username