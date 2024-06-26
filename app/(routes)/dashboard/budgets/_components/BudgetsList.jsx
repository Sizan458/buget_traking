
'use client'
import React, { useEffect } from 'react'
import CreatBudget from './CreatBudget'
import { db } from '@/ulits/dbConfig'
import { eq, getTableColumns, sql, sum } from 'drizzle-orm'
import { Budgets, Expenses } from '@/ulits/Schema'
import { useUser } from '@clerk/nextjs'

const BudgetsList = () => {
  const {user}=useUser()
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
   console.log(result)
  }
  return (
    <div className='mt-7'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 '>
      <CreatBudget/>
      </div>
      
    </div>
  )
}

export default BudgetsList
