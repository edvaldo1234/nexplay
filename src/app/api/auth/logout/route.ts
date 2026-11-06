import {NextResponse} from "next/server";
import {query} from "@/lib/db";
import {hashToken,sessionCookie,sessionName} from "@/lib/auth";
export async function POST(req:Request){const origin=req.headers.get("origin");if(!origin||origin!==(process.env.APP_ORIGIN||new URL(req.url).origin))return NextResponse.json({error:"Origem inválida"},{status:403});const cookie=req.headers.get("cookie")||"";const token=cookie.split(";").map(x=>x.trim()).find(x=>x.startsWith(sessionName+"="))?.slice(sessionName.length+1);if(token)await query("DELETE FROM sessions WHERE token_hash=$1",[hashToken(decodeURIComponent(token))]);const response=NextResponse.json({ok:true});response.cookies.set(sessionName,"",{...sessionCookie(),maxAge:0});return response;}
