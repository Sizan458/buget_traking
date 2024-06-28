'use client'
import { Budgets, Expenses } from '@/ulits/Schema'
import { db } from '@/ulits/dbConfig'
import { useUser } from '@clerk/nextjs'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import BudgetItem from '../../budgets/_components/BudgetItem'
import AddExpenses from '../_components/AddExpenses'
import { ExpenseListTable } from '../_components/ExpenseListTable'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, PenBox,  Trash } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import EditBudget from '../_components/EditBudget'
import Link from 'next/link'


function ExpensesComponent({params}) {
  const {user}=useUser()
  const [budgetInfo,SetBudgetInfo] =  useState([])
  const [expenseList,setExpensesList] =  useState([])
  const route =useRouter()
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
     //console.log(result)
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
  //delete the current budget
  const deleteBudget= async()=>{
    const deleteExpenseResult= await db.delete(Expenses)
    .where(eq(Expenses.budgetId, params.id))
    .returning()
    if(deleteExpenseResult){
      const result = await  db.delete(Budgets)
      .where(eq(Budgets.id, params.id))
      .returning()
      //console.log(result)
    }
    toast('Budgets deleted !');
    route.replace('/dashboard/budgets')
  }
  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold flex justify-between items-center'>
        <div className='flex items-center'><Link href='/dashboard'><ArrowLeft/></Link> My Expenses</div>
        <div className='flex gap-2 items-center'>
         {/* edit budget  function */}
       <EditBudget budgetInfo={budgetInfo} refreshData={()=>getBudgetInfo()}/>
      {/* delete budget  function */}
      <AlertDialog>
  <AlertDialogTrigger asChild>
  <Button className='flex gap-2' variant='destructive'><Trash/> Delete</Button>
    </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your  current Budget along  with  expenses
        and remove your data from  servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={()=>deleteBudget()}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
</div>
      </h2>
      
    
      <div className='grid grid-cols-1 lg:grid-cols-2 mt-5 gap-5'>
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