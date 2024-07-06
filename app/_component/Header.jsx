'use client'
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  const {user,isSignedIn}=useUser()
  return (
    <div className='p-5 flex justify-between items-center border shadow-sm'>
    
      <Image src={'/pics/logo.png'} alt='logo' height={40} width={40}/>
    
      <Link class="block w-full rounded  bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
          href="/dashboard">
             Dashboard
          </Link>
        {isSignedIn?<UserButton/>:

        <Link href={'/sign-in'}><Button>Get Started</Button></Link>}
           
        
    </div>
  )
}

export default Header