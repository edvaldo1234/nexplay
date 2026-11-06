import {NextResponse,type NextRequest} from "next/server";
export function middleware(req:NextRequest){
 const path=req.nextUrl.pathname;
 if(path.startsWith("/api/")||path==="/login"||path==="/api/health"||path.startsWith("/_next"))return NextResponse.next();
 if(!req.cookies.has("nexplay_session"))return NextResponse.redirect(new URL("/login",req.url));
 return NextResponse.next();
}
export const config={matcher:["/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|webp)$).*)"]};
