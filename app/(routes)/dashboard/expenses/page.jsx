'use client'
import { Budgets, Expenses } from '@/ulits/Schema'
import { db } from '@/ulits/dbConfig'
import { useUser } from '@clerk/nextjs'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { ExpenseListTable } from './_components/ExpenseListTable'

function Expense() {
    const {user}=useUser()
    const [budget, setBudget] = useState([])
    const [expenseList, setExpenseList] = useState([])
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
    <div className='p-10'>
        <ExpenseListTable expenseList={expenseList} refreshData={()=>getBudgetInfo()}/>
        </div>
  )
}

export default Expense