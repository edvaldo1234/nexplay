"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

/** Closes a completed month into pending invoices. No charge or Pix is sent. */
export function BillingClose(){
 const router=useRouter(); const [period,setPeriod]=useState("");const [busy,setBusy]=useState(false);const [message,setMessage]=useState("");
 return <form className="mb-6 flex flex-wrap items-end gap-3 rounded-xl border border-white/10 bg-graphite p-4" onSubmit={async e=>{
  e.preventDefault();setBusy(true);setMessage("");try{
   const response=await fetch("/api/billing/close",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({period})});
   const result=await response.json();if(!response.ok)throw Error(result.error||"Erro ao fechar mês");
   setMessage(`${result.createdInvoices} fatura(s) pendente(s) criada(s). Nenhum pagamento realizado.`);router.refresh();
  }catch(error){setMessage(error instanceof Error?error.message:"Falha no fechamento");}finally{setBusy(false);}
 }}>
  <label className="text-sm">Mês já encerrado<input required value={period} onChange={e=>setPeriod(e.target.value)} type="month" className="mt-1 block rounded bg-ink p-2" /></label>
  <button disabled={busy||!period} className="rounded bg-brand px-4 py-2.5 text-sm font-semibold disabled:opacity-50">{busy?"Fechando...":"Gerar faturas pendentes"}</button>
  {message&&<p className="w-full text-sm" role="status">{message}</p>}
 </form>;
}
