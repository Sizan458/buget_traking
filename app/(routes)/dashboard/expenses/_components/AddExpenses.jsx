"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Budgets, Expenses } from "@/ulits/Schema";
import { db } from "@/ulits/dbConfig";
import { Loader, RefreshCcw } from "lucide-react";
import moment from "moment";
import React, { act, useState } from "react";
import { toast } from "sonner";

function AddExpenses({ budgetId, user, refreshData }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  //use for add  new  expense
  const addNewExpense = async () => {
    setLoading(true);
    const result = await db
      .insert(Expenses)
      .values({
        name: name,
        amount: amount,
        budgetId: budgetId,
        createdAt: moment().format("DD/MM/yyy"),
      })
      .returning({ insertedId: Budgets.id });
    setAmount("");
    setName("");
    //console.log(result)
    if (result) {
      setLoading(false)
      refreshData();
      toast("New Expense Added!");
    }
    setLoading(false);
  };
  return (
    <div className=" border p-5 rounded-lg">
      <h2 className="font-bold text-lg">Add Expenses</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1 text-base ">Expense Name</h2>
        <Input
          placeholder="e.g BedRoom Decare"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1 text-base ">
          Expense Amount
        </h2>
        <Input
          placeholder="e.g 1000"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button
        disabled={!(name && amount) || loading}
        onClick={() => addNewExpense()}
        className="mt-3 w-full"
      >
        {loading ? <Loader className=" animate-spin" /> : " Add New Expense"}
        Add New Expense
      </Button>
    </div>
  );
}

export default AddExpenses;
