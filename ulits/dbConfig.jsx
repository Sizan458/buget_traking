import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import  *  as  schema from './Schema'

const sql = neon('postgresql://hobby_owner:0xV7fwMrGTDN@ep-divine-river-a589zpr2.us-east-2.aws.neon.tech/Budget_Traking?sslmode=require');
 export  const db = drizzle(sql,{schema});


