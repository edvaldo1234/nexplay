import {randomBytes,scryptSync,timingSafeEqual,createHash} from "node:crypto";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {query} from "@/lib/db";
import type {AppUser} from "@/types";
const COOKIE="nexplay_session";
export function passwordHash(password:string){const salt=randomBytes(16).toString("hex");return salt+":"+scryptSync(password,salt,64).toString("hex");}
export function verifyPassword(password:string,hash:string){try{const [salt,value]=hash.split(":");const expected=Buffer.from(value,"hex");const actual=scryptSync(password,salt,64);return expected.length===actual.length&&timingSafeEqual(expected,actual);}catch{return false;}}
export function hashToken(token:string){return createHash("sha256").update(token).digest("hex");}
export function newToken(){return randomBytes(32).toString("hex");}
export function sessionCookie(){return {httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax" as const,path:"/",maxAge:60*60*24*7};}
export async function optionalUser():Promise<AppUser|null>{
 const token=(await cookies()).get(COOKIE)?.value;
 if(!token||!process.env.DATABASE_URL)return null;
 const rows=await query<any>(`SELECT u.id,u.name,u.email,u.role,u.reseller_id FROM sessions s JOIN users u ON s.user_id=u.id WHERE s.token_hash=$1 AND s.expires_at>now() AND u.active=true LIMIT 1`,[hashToken(token)]);
 const u=rows[0];return u?{id:u.id,name:u.name,email:u.email,role:u.role,resellerId:u.reseller_id??undefined}:null;
}
export async function getCurrentUser():Promise<AppUser>{const u=await optionalUser();if(!u)redirect("/login");return u;}
export async function getApiUser(){return optionalUser();}
export const sessionName=COOKIE;
