import { UserButton } from '@clerk/nextjs'
import React from 'react'

import { LayoutGrid, PiggyBank, ReceiptText } from 'lucide-react'
import Menus from './Menus'
const DashBoardHeader = () => {
  
  return (
    <div className='p-5  shadow-sm  border-b  flex justify-between '>
        <div>
      <Menus/>
        </div>
        <div className='md:hidden'>
            <UserButton/>
        </div>
      
    </div>
  )
}

export default DashBoardHeader
