'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
export function NewCustomerForm({resellers,isMaster}:{resellers:{id:string;name:string}[];isMaster:boolean}){
 const router=useRouter();const [error,setError]=useState('');const[busy,setBusy]=useState(false);
 return <section className="max-w-xl"><h1 className="mb-5 text-2xl font-bold">Novo cliente</h1>
 {resellers.length===0?<p className="rounded-xl border border-amber-500/30 bg-amber-900/20 p-4">Cadastre um revendedor ativo antes de adicionar clientes.</p>:<form className="space-y-4 rounded-xl bg-graphite p-6" onSubmit={async e=>{
 e.preventDefault();setError('');setBusy(true);const f=new FormData(e.currentTarget);const v={name:f.get('name'),whatsapp:f.get('whatsapp'),plan:f.get('plan'),tech:f.get('tech'),devices:Number(f.get('devices')),resellerId:isMaster?f.get('resellerId'):undefined};
 try{const res=await fetch('/api/customers',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(v)});const result=await res.json();if(!res.ok)throw Error(result.error||'Falha ao salvar');router.push('/clientes');router.refresh();}catch(err){setError(err instanceof Error?err.message:'Falha ao salvar');}finally{setBusy(false)}
 }}>
 <label className="block text-sm">Nome<input name="name" required minLength={2} maxLength={140} className="mt-1 w-full rounded bg-ink p-2" /></label>
 <label className="block text-sm">WhatsApp<input name="whatsapp" maxLength={24} className="mt-1 w-full rounded bg-ink p-2" /></label>
 <label className="block text-sm">Plano<input name="plan" required maxLength={80} className="mt-1 w-full rounded bg-ink p-2" /></label>
 {isMaster&&<label className="block text-sm">Revendedor<select required name="resellerId" className="mt-1 w-full rounded bg-ink p-2">{resellers.map(r=><option value={r.id} key={r.id}>{r.name}</option>)}</select></label>}
 <label className="block text-sm">Tecnologia<select name="tech" className="mt-1 w-full rounded bg-ink p-2"><option>IPTV</option><option>P2P</option></select></label>
 <label className="block text-sm">Dispositivos<input type="number" name="devices" defaultValue={1} min={1} max={8} className="ml-2 w-16 rounded bg-ink p-2" /></label>
 <p className="text-xs text-mute">O cadastro não ativa transmissão. O status inicial será pendente.</p>
 {error&&<p role="alert" className="text-rose-400">{error}</p>}
 <button disabled={busy} className="rounded bg-brand px-5 py-3 disabled:opacity-50">{busy?'Salvando...':'Salvar cliente'}</button>
 </form>}</section>
}
