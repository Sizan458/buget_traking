'use client'
import React from 'react'
import { Image, LayoutGrid, PiggyBank, ReceiptText } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const menus = [
  {
    id: 1,
    name: 'Dashboard',
    icon: LayoutGrid,
    path: '/dashboard'
  },
  {
    id: 2,
    name: 'Budgets',
    icon: PiggyBank,
    path: '/dashboard/budgets'
  },
  {
    id: 3,
    name: 'Expenses',
    icon: ReceiptText,
    path: '/dashboard/expenses'
  }
]



const Menus = () => {
  const path = usePathname()

  return (
    <div className='  md:hidden  mr-[130px]  flex'>
       
      <DropdownMenu>
        <DropdownMenuTrigger className='bg-slate-200 h-[30px] w-[130px]'>Menus</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSeparator />
          {menus.map((menu) => (
            <Link key={menu.id} href={menu.path} passHref>
              <DropdownMenuItem as="a" className={`${path === menu.path && 'text-primary bg-blue-100'}`}>
                <menu.icon className="mr-2"/> {menu.name}
              </DropdownMenuItem>
            </Link>
          ))}
         
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Menus
