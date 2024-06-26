import { name } from "drizzle-orm";
import { integer, numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const  Budgets = pgTable('budgets',{
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    amount:varchar('amount').notNull(),
    icons:varchar('icons'),
    createdBy:varchar('createdBy').notNull(),
})

export const  Expenses= pgTable('expenses',{
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    amount:varchar('amount').notNull(),
    budgetId:integer('budgetId').references(()=>Budgets.id),
    createdAt:varchar('createdAt').notNull(),
})