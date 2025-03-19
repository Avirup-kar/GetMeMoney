/* eslint-disable @next/next/no-img-element */
import Link from "next/link";


export default function Home() {
  return (
    <>
      <div className=" flex flex-col justify-center items-center h-[44vh] text-white">
      <div className="flex ">
        <div className=" text-2xl min-[400px]:text-4xl md:text-5xl font-semibold px-4">Raise The Money</div>
        <img className="w-15 min-[400px]:w-20 mt-[-10px]" src="cash.gif" alt="" />
        </div>
        <p className="max-[400px]:text-[10px] px-7 mx-auto">
          A Crowdfunding Platfrom for Creators. get Funded By Your Fans and your
          Follower. Strat Now!
        </p>
        <div className="mt-7">
        <Link href="/Login">
        <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button>
        </Link>
        <Link href="/About">
        <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
        </Link>
        </div>
      </div>
      <div className="bg-white h-0.5 opacity-30"></div>

      <div className="text-white container mx-auto py-15">
        <h1 className="text-2xl font-bold text-center mb-6">Your fan Can give you a support</h1>
        <div className="mid flex flex-col gap-7 md:flex-row justify-around">
          <div className="flex flex-col items-center justify-center">
            <img className="w-40 md:w-20 p-3 bg-gray-600 rounded-full" src="https://static.vecteezy.com/system/resources/previews/010/872/795/non_2x/3d-business-man-working-on-laptop-png.png" alt="" />
            <p className="font-bold">Lorem ipsum dolor sit.</p>
            <p className="font-thin px-5">Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img className="w-40 md:w-20 p-3 bg-gray-600 rounded-full" src="http://static.vecteezy.com/system/resources/previews/019/046/339/non_2x/gold-coin-money-symbol-icon-png.png" alt="" />
            <p className="font-bold">Lorem ipsum dolor sit.</p>
            <p className="font-thin px-5">Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img className="w-40 md:w-20 p-3 bg-gray-600 rounded-full" src="https://cdn-icons-png.flaticon.com/512/166/166258.png" alt="" />
            <p className="font-bold">Lorem ipsum dolor sit.</p>
            <p className="font-thin px-5">Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-0.5 opacity-30"></div>

      <div className="text-white container mx-auto py-10">
        <h1 className="text-2xl font-bold text-center my-7">Learm More abot Us</h1>
        <div className="pb-6 flex justify-around">
        <iframe width="420" height="260" src="https://www.youtube.com/embed/KuUUV-tX_44?si=Cfpo7arpIz3x9z9M" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </div>

    </>
  );
}
