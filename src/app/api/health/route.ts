import {NextResponse} from "next/server";import {query} from "@/lib/db";
export async function GET(){try{const r=await query<{ok:number}>("SELECT 1 as ok");return NextResponse.json({status:r[0]?.ok===1?"ok":"degraded",database:"connected"},{headers:{"Cache-Control":"no-store"}});}catch{return NextResponse.json({status:"unavailable",database:"disconnected"},{status:503});}}
