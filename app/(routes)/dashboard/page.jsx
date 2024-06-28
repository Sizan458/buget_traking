/* eslint-disable react/no-unescaped-entities */
'use client'
// eslint-disable-next-line react-hooks/exhaustive-deps
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import CardsInfo from './_components/CardsInfo'
import { db } from '@/ulits/dbConfig'
import { Budgets, Expenses } from '@/ulits/Schema'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import Barchart from './_components/Barchart'
import BudgetItem from './budgets/_components/BudgetItem'
import { ExpenseListTable } from './expenses/_components/ExpenseListTable'

const Dashboard = () => {
  
  const {user}=useUser()
  const [budget, setBudget] = useState([])
  const [expenseList, setExpenseList] = useState([])
  // used to get budgect list
  useEffect(() =>{
  user&&getBudgetInfo()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user])
  // get budget info
  const getBudgetInfo= async()=>{
    
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
      getAllExpenses()
  }
  // function to  Get All Expenses belong to user
  const  getAllExpenses = async()=>{
  const result = await db.select({
    id:Expenses.id,
    name:Expenses.name,
    amount:Expenses.amount,
    createdAt:Expenses.createdAt
  }).from(Budgets)
  .rightJoin(Expenses,eq(Budgets.id, Expenses.budgetId))
  .where(eq(Budgets.createdBy,user?.primaryEmailAddress.emailAddress))
  .orderBy(desc(Expenses.id))
  setExpenseList(result)
  //console.log(result)
  }
  return (
    <div className='p-8'>
      
         <h2 className='font-bold text-3xl'>Hi,{user?.fullName} 🤞
         </h2>
         <p className=' text-gray-500'>Here's what happening with your money, Lets Manage your expense</p>
         <CardsInfo getBudgetInfo={budget}/>
         <div className=' grid grid-cols-1 xl:grid-cols-3 mt-6 gap-5'>
          <div className=' xl:col-span-2'>
          <Barchart getBudgetInfo={budget}/>

          <ExpenseListTable expenseList={expenseList} refreshData={()=>getBudgetInfo()}/>
          </div>
          <div className=' grid gap-5'>
            <h2 className='font-bold text-lg'>Lates Budget</h2>
        {budget.map((list,index)=>(
          <BudgetItem list={list} key={index}/>
        ))}
         </div>
     
         </div>
         
        </div>
  )
}

export default Dashboard