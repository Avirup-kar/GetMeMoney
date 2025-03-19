"use client"
import { useState } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"

const Navbar = () => {
  const { data: session } = useSession()
  const [showdropdown, setShowdropdown] = useState(false)


  console.log('session:', session)
  
  // if(session) {
  //   return <>
  //     Signed in as {session.user.email} <br/>
  //     <button onClick={() => signOut()}>Sign out</button>
  //   </>
  // }
  setTimeout(() => {})
  return (
    <nav className="bg-gray-800 py-2 shadow-md">
        <div className="container mx-auto px-10 flex justify-between items-center">
            <Link href="/" className="text-white text-xl font-bold">GetMeMoney</Link>
            <div className='relative'>
          {session && <><button onClick={() => {setShowdropdown(!showdropdown)}} onBlur={()=>{setTimeout(() => {setShowdropdown(false)},200)}} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="flex justify-center items-center text-white w-full bg-gradient-to-br cursor-pointer from-purple-600 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 disabled:from-purple-500 disabled:to-blue-500  me-2 text-center" type="button">{(session.user.email).split("gmail")[0]}<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
          </svg>
           </button>

<div id="dropdown" className={`z-10 ${showdropdown? "":"hidden"}  absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-50 dark:bg-gray-700`}>
    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
      <li>
        <Link href="/Dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
      </li>
      <li>
        <Link href={`${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
      </li>
      <li>
        <Link onClick={() => signOut()} href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
      </li>
    </ul>
</div>
</>
}
            {!session &&  <Link href="/Login" className="text-white font-bold bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg text-sm px-5 py-2 text-center me-2 ">Login</Link>}
            </div>
        </div>
    </nav>
  )
}

export default Navbar
