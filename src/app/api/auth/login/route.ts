import {rejectCrossOrigin} from "@/lib/request-security";
import {NextResponse} from "next/server";
import {query} from "@/lib/db";
import {verifyPassword,newToken,hashToken,sessionCookie,sessionName} from "@/lib/auth";
import {createHash} from "node:crypto";
export const runtime="nodejs";
export async function POST(req:Request){const blocked=rejectCrossOrigin(req);if(blocked)return blocked;
 try{
 const body=await req.json();const email=String(body.email||"").trim().toLowerCase();const password=String(body.password||"");
 if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)||!password||password.length>200)return NextResponse.json({error:"Credenciais inválidas"},{status:401});
 const ip=String(req.headers.get("x-forwarded-for")||"unknown").split(",")[0].trim();const ipHash=createHash("sha256").update(ip).digest("hex");
 const recent=await query<{n:string}>("SELECT count(*)::text n FROM login_attempts WHERE (email=$1 OR ip_hash=$2) AND created_at > now()-interval '15 minutes'",[email,ipHash]);
 if(Number(recent[0]?.n)>12)return NextResponse.json({error:"Muitas tentativas. Aguarde 15 minutos."},{status:429});
 await query("INSERT INTO login_attempts(email,ip_hash) VALUES($1,$2)",[email,ipHash]);
 const user=(await query<any>("SELECT id,name,email,role,reseller_id,password_hash FROM users WHERE email=$1 AND active=true LIMIT 1",[email]))[0];
 if(!user||!verifyPassword(password,user.password_hash))return NextResponse.json({error:"E-mail ou senha incorretos"},{status:401});
 const token=newToken();await query("INSERT INTO sessions(user_id,token_hash,expires_at) VALUES ($1,$2,now()+interval '7 days')",[user.id,hashToken(token)]);
 const response=NextResponse.json({ok:true});response.cookies.set(sessionName,token,sessionCookie());return response;
 }catch{return NextResponse.json({error:"Falha ao autenticar"},{status:500});}
}
