import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <section class="bg-gray-50 flex items-center flex-col">
    <div class="mx-auto max-w-screen-xl px-4 py-32 lg:flex ">
      <div class="mx-auto max-w-xl text-center">
        <h1 class="text-3xl font-extrabold sm:text-5xl">
        Manager Your Expense
          <strong class="font-extrabold  text-primary sm:block"> Control your Money </strong>
        </h1>
  
        <p class="mt-4 sm:text-xl/relaxed">
        Start Creating your budget and save ton of money
        </p>
  
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          
          <Link
            class="block w-full rounded  bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
            href="/sign-up"
          >
            Get Started
          </Link>
  
          
        </div>
      </div>
    </div>
    <Image src={'/pics/dashboard.jpeg'} alt='dashboard' width={1000} height={700}  className=' -mt-12 rounded-xl border-2 mb-2'/>
  </section>
  )
}

export default Hero