import {NextResponse} from "next/server";
/** Reject requests sent from another website. Uses the application public origin (or request URL). */
export function rejectCrossOrigin(req: Request): NextResponse | null {
  const origin=req.headers.get("origin");
  const expected=process.env.APP_ORIGIN || new URL(req.url).origin;
  // Browsers send Origin for fetch POST/PATCH. Deliberately fail closed otherwise.
  if (!origin || origin!==expected) return NextResponse.json({error:"Origem da requisição não permitida"},{status:403});
  const ct=req.headers.get("content-type")||"";
  if (!ct.toLowerCase().startsWith("application/json")) return NextResponse.json({error:"Content-Type inválido"},{status:415});
  return null;
}
