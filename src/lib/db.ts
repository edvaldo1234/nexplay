import { neon } from "@neondatabase/serverless";
export function db(){
 const url=process.env.DATABASE_URL;
 if(!url) throw new Error("DATABASE_URL não configurada");
 return neon(url);
}
export async function query<T=Record<string,unknown>>(sql:string,params:unknown[]=[]):Promise<T[]>{
 const result=await db().query(sql,params);
 return result as T[];
}
