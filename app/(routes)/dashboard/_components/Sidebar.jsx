'use client'
import Image from 'next/image'
import React from 'react'
import { LayoutGrid, PiggyBank, ReceiptText } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
const Sidebar = () => {
  const menus =[
    {
      id:1,
     name: 'Dashboard',
     icon:LayoutGrid,
     path:'/dashboard'
    },
    {
      id:2,
     name: 'Budgets',
     icon:PiggyBank,
     path:'/dashboard/budgets'
    },
    {
      id:3,
     name: 'Expenses',
     icon:ReceiptText,
     path:'/dashboard/expenses'
    }
  ]
  const path=usePathname()
  return (
    <div className=' h-screen p-5'>
      <Image src={'/pics/logo.png'} alt='logo' width={50} height={50}/>
      <div className='mt-5'> 
        {menus.map((menu,index)=>(
          <Link key={menu.id} href={menu.path}>
          <h2  className={`flex gap-2 items-center text-gray-500 font-medium mb-2 p-5 cursor-pointer rounded-md hover:text-primary hover:bg-blue-100 ${path==menu.path  && 'text-primary bg-blue-100'}`} >
            <menu.icon/> 
            {menu.name}
            </h2>
            </Link>
        ))}
      </div>
     <div className='fixed bottom-10 p-5 flex items-center  gap-2  '>
      <UserButton/>
      Profile
     </div>
    </div>
  )
}

export default Sidebar
