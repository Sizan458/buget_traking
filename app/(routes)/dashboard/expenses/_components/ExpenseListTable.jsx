import { Trash } from "lucide-react";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/ulits/dbConfig";
import { Expenses } from "@/ulits/Schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

export const ExpenseListTable = ({ expenseList, refreshData }) => {
const deleteExpense= async(expense)=>{
const result= await db.delete(Expenses)
.where(eq(Expenses.id,expense.id))
.returning()
if(result){
  toast('Expense deleted successfully ')
  refreshData()
}

}
  return (
    <div className="mt-3">
       {/* <h2 className='font-bold text-lg mb-3'>Lates Expenses</h2> */}
      <Table>
        <TableHeader className=" bg-slate-200 font-bold ">
          <TableRow>
            <TableHead className=" font-bold">Name</TableHead>
            <TableHead  className=" font-bold">Amount</TableHead>
            <TableHead  className=" font-bold">Date</TableHead>
            <TableHead  className=" font-bold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-slate-50">
          {expenseList.map((expense, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{expense.name}</TableCell>
              <TableCell>{expense.amount}</TableCell>
              <TableCell>{expense.createdAt}</TableCell>
              <TableCell className="text-right">
                <Trash className="text-red-600 cursor-pointer" onClick={()=>deleteExpense(expense)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
