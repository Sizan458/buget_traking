import Link from 'next/link'
import React from 'react'

function BudgetItem({list}) {
  const calculateProgressBar=()=>{
    const prec =(list.totalSpend/list.amount)*100
    return prec.toFixed(2) 
  }
  return (
    < Link  href={'/dashboard/expenses/'+list?.id} >
      <div className='p-5 border rounded-lg hover:shadow-md cursor-pointer h-[170px]'>
        <div className='flex gap-2  items-center justify-between'>
        <div className='flex gap-2  items-center'>
            <h2 className='text-2xl p-3 px-4 bg-slate-100 rounded-full'>{list.icons}</h2>
            <div>
                <h2 className='font-bold' >{list.name}</h2>
                <h2 className='text-sm text-gray-500 '>{list.totalItem} Item</h2>
            </div>
           
        </div>
        <h2 className='font-bold text-primary text-lg'>${list.amount}</h2>
        </div >
        <div className='mt-5'>
            <div className='flex items-center justify-between mb-3'>
               <h2 className='text-md  text-slate-400 '>${list.totalSpend?list.totalSpend:0  }Spend</h2> 
               <h2 className='text-md text-slate-400 '>${list.amount-list.totalSpend } Remaining</h2> 
            </div>
          <div className='w-full bg-slate-300 h-2  rounded-full'>
          <div className=' bg-primary h-2  rounded-full' style={{width:`${calculateProgressBar()}%`}}>

          </div>
            </div>  
        </div>
        </div>
    </Link>
  )
}

export default BudgetItem