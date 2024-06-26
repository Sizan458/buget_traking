'use client'
import React, { useEffect } from 'react'
import Sidebar from './_components/Sidebar'
import DashBoardHeader from './_components/DashBoardHeader'

import { Budgets } from '@/ulits/Schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { db } from '@/ulits/dbConfig'
import { useRouter } from 'next/navigation'



const dashBoardLayout = ({ children}) => {
  // eslint-disable-next-line import/no-anonymous-default-export, react-hooks/rules-of-hooks
  const {user} = useUser()
  // eslint-disable-next-line import/no-anonymous-default-export, react-hooks/rules-of-hooks
  const router = useRouter()
  // eslint-disable-next-line import/no-anonymous-default-export,react-hooks/rules-of-hooks
  useEffect(()=>{
   user && checkUserBudget()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user])
  const  checkUserBudget= async()=>{
    
    const result = await  db.select()
    .from(Budgets)
    .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
    console.log(result)
    if(result?.length==0){
     router.replace('/dashboard/budgets')
    }
  }
  return (
    <div>
      <div className=' fixed hidden md:w-64 md:block border  shadow-sm'> 
        <Sidebar/>
      </div>
   <div className='md:ml-64 '>
    <DashBoardHeader/>
   {children}
   </div>
    </div>
  )
}

export default dashBoardLayout
