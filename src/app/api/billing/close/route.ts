import { NextResponse } from "next/server";
import { z } from "zod";
import { getApiUser } from "@/lib/auth";
import { query } from "@/lib/db";
import { rejectCrossOrigin } from "@/lib/request-security";
export const runtime="nodejs";
const schema=z.object({period:z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/)}).strict();
/** Create draft invoices from truly active subscriptions only. No payment is charged. */
export async function POST(req:Request){
 const blocked=rejectCrossOrigin(req);if(blocked)return blocked;
 const u=await getApiUser();if(!u)return NextResponse.json({error:"Não autorizado"},{status:401});
 if(u.role!=="master")return NextResponse.json({error:"Somente master"},{status:403});
 const parsed=schema.safeParse(await req.json().catch(()=>null));
 if(!parsed.success)return NextResponse.json({error:"Período inválido"},{status:400});
 const period=parsed.data.period;
 const end=new Date(`${period}-01T00:00:00.000Z`);end.setUTCMonth(end.getUTCMonth()+1);
 const now=new Date();
 if(end>now)return NextResponse.json({error:"Só é possível fechar períodos encerrados"},{status:400});
 const rows=await query<{id:string}>(`INSERT INTO invoices(reseller_id,period,activations,amount,status,due_at)
 SELECT reseller_id,$1,count(*)::int,coalesce(sum(price),0),'pendente',($2::date + interval '10 days')::date
 FROM subscriptions WHERE status='ativo' AND created_at >= $3::timestamptz AND created_at < $2::timestamptz
 GROUP BY reseller_id ON CONFLICT (reseller_id,period) DO NOTHING RETURNING id`,
 [period,end.toISOString(),`${period}-01T00:00:00.000Z`]);
 await query("INSERT INTO audit_logs(actor_id,action,target_type) VALUES($1,'billing_close','invoice')",[u.id]);
 return NextResponse.json({ok:true,createdInvoices:rows.length,period,note:"Faturas pendentes. Nenhum Pix foi emitido ou cobrado."});
}
