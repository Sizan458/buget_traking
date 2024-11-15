import { PiggyBank, PiggyBankIcon, ReceiptText, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function CardsInfo({getBudgetInfo}) {
  //console.log(getBudgetInfo)
  const [totalBudget,setTotalBudget]=useState(0)
  const [totalSpend,setTotalSpend]=useState(0)
  const calculateCardInfo=()=>{
    

    console.log(getBudgetInfo)
    let totalBudget_=0
    let totalSpend_ = 0;
    getBudgetInfo.forEach(element => {
      totalBudget_=totalBudget_ + Number(element.amount)
      totalSpend_=totalSpend_ + element.totalSpend

    });
    setTotalBudget(totalBudget_)
    setTotalSpend(totalSpend_)
    //console.log(totalBudget_,totalSpend_)
  }
  useEffect(()=>{
   getBudgetInfo && calculateCardInfo()
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[getBudgetInfo])
  return (
   <div>
    {getBudgetInfo ?.length>0 ? <div className='mt-7 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>

     
      
  
   <div className='p-7  border rounded-lg flex items-center justify-between'>
<div>
<h2 className=' text-sm'>Total Budget</h2>
<h2 className=' font-bold  text-2xl'>${totalBudget}</h2>
  
</div>
<PiggyBank className='bg-primary p-2 h-12 w-12 rounded-full  text-white'/>
   </div>
   <div className='p-7  border rounded-lg flex items-center justify-between'>
<div>
<h2 className=' text-sm'>Total Spend</h2>
<h2 className=' font-bold  text-2xl'>${totalSpend}</h2>
  
</div>
<ReceiptText className='bg-primary p-2 h-12 w-12 rounded-full  text-white'/>
   </div>
   <div className='p-7  border rounded-lg flex items-center justify-between'>
<div>
<h2 className=' text-sm'>No. of Budget</h2>
<h2 className=' font-bold  text-2xl'>{getBudgetInfo.length}</h2>
  
</div>
<Wallet className='bg-primary p-2 h-12 w-12 rounded-full  text-white'/>
   </div>
   


   </div>:
   <div className='mt-7 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
    {[1,2,3].map((item, index) =>(
      <div className='h-110 w-full bg-slate-200  animate-pulse rounded-lg' key={index}>

      </div>
    ))}
   </div>
   }
   </div>
    
  )
}

export default CardsInfo