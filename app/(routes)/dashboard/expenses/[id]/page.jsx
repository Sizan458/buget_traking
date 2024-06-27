'use client'
import { Budgets, Expenses } from '@/ulits/Schema'
import { db } from '@/ulits/dbConfig'
import { useUser } from '@clerk/nextjs'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import BudgetItem from '../../budgets/_components/BudgetItem'
import AddExpenses from '../_components/AddExpenses'
import { ExpenseListTable } from '../_components/ExpenseListTable'

function ExpensesComponent({params}) {
  const {user}=useUser()
  const [budgetInfo,SetBudgetInfo] =  useState([])
  const [expenseList,setExpensesList] =  useState([])
  useEffect(()=>{
   user && getBudgetInfo()
   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user])
  //get budget information
  const getBudgetInfo= async()=>{
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend:sql `sum(CAST(${Expenses.amount} As NUMERIC)  )`.mapWith(Number),
      totalItem:sql `count(${Expenses.id})`.mapWith(Number)
     }).from(Budgets)
     .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
     .where(eq(Budgets.createdBy,user.primaryEmailAddress?.emailAddress))
     .where(eq(Budgets.id,params.id))
     .groupBy(Budgets.id)
     console.log(result)
     SetBudgetInfo(result[0])
     getExpensesList()
    
  }
  //get the latest expense
  const getExpensesList= async() =>{
   const result = await db.select().from(Expenses)
   .where(eq(Expenses.budgetId, params.id))
   .orderBy(desc(Expenses.id));
   setExpensesList(result)
   //console.log(result)
  }
  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold'>My Expenses</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-5 gap-5'>
       {budgetInfo?<BudgetItem list={budgetInfo}/>:
       <div className='h-[150px] w-full bg-slate-200 rounded-lg  animate-pulse'>

       </div>
       } 
       <AddExpenses budgetId={params.id} user={user} refreshData={()=>getBudgetInfo()}/>
      </div>
      <div>
        <h2 className=' font-bold text-lg'>Latest Expenses</h2>
        <ExpenseListTable expenseList={expenseList}  refreshData={()=>getBudgetInfo()}/>
      </div>
      </div>
  )
}

export default ExpensesComponent