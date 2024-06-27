
'use client'
import React, { useEffect, useState } from 'react'
import CreatBudget from './CreatBudget'
import { db } from '@/ulits/dbConfig'
import { desc, eq, getTableColumns, sql, sum } from 'drizzle-orm'
import { Budgets, Expenses } from '@/ulits/Schema'
import { useUser } from '@clerk/nextjs'
import BudgetItem from './BudgetItem'

const BudgetsList = () => {
  const {user}=useUser()
  const [budget, setBudget] = useState([])
  // used to get budgect list
  useEffect(() =>{
  user&&budgetsList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user])
  const budgetsList =async()=>{
   const result = await db.select({
    ...getTableColumns(Budgets),
    totalSpend:sql `sum(CAST(${Expenses.amount} AS NUMERIC)  )`.mapWith(Number),
    totalItem:sql `count(${Expenses.id})`.mapWith(Number)
   }).from(Budgets)
   .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
   .where(eq(Budgets.createdBy,user.primaryEmailAddress?.emailAddress))
   .groupBy(Budgets.id)
   .orderBy(desc(Budgets.id))
   //console.log(result)
   setBudget(result)
  }
  return (
    <div className='mt-7'>
      <div className='grid gap-5 grid-cols-1  lg:grid-cols-3 '>
      <CreatBudget
       refreshData={()=>budgetsList()}
      />
     
      {budget?.length>0? budget.map((list,index)=>(
        <BudgetItem key={index} list={list} />
      )):[1,2,3,4,5,6].map((item,index)=>(
        <div key={index} className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse'></div>
      ))

      }
      </div>
      
    </div>
  )
}

export default BudgetsList
