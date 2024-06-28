"user client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import EmojiPicker from "emoji-picker-react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/ulits/dbConfig";
import { Budgets } from "@/ulits/Schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

function EditBudget({ budgetInfo, refreshData }) {
  const [emoji, setEmoji] = useState(budgetInfo?.icons);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const { user } = useUser();
  useEffect(()=>{
    if(budgetInfo){
        setEmoji(budgetInfo?.icons)
        setName(budgetInfo?.name)
        setAmount(budgetInfo?.amount)
    }
  
  },[budgetInfo])
  const Update = async () => {
    const result = await db
      .update(Budgets)
      .set({
        name: name,
        amount: amount,
        icons: emoji,
      })
      .where(eq(Budgets.id, budgetInfo.id))
      .returning();
    if (result) {
      toast("Budgets updated successfully !");
      refreshData();
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex gap-2">
            <PenBox />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                  className="text-xl"
                >
                  {emoji}
                </Button>
                <div className=" absolute z-20">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmoji(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1 text-base ">
                    Budget Name
                  </h2>
                  <Input
                    placeholder="e.g Home Decare"
                    name="name"
                    defaultValue={budgetInfo.name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1 text-base ">
                    Budget Amount
                  </h2>
                  <Input
                    type="number"
                    placeholder="e.g 5000$"
                    name="amount"
                    defaultValue={budgetInfo.amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                className="mt-5 w-full"
                onClick={() => Update()}
              >
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditBudget;
