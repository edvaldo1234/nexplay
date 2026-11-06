"use client";
import { useState } from "react";
import { Copy, MessageCircle, Zap } from "lucide-react";
import { z } from "zod";
import { Badge, Button, Card } from "@/components/ui";
import { cn, fdatetime } from "@/lib/utils";

import type { Tech, Trial } from "@/types";

const packs: Record<Tech, string[]> = { IPTV: ["Essencial", "Completo", "Premium"], P2P: ["Essencial", "Completo"] };
const durations = [1, 2, 6, 12, 24];
const form = z.object({ contact: z.string().min(3, "Informe o nome ou WhatsApp do cliente.") });

function Seg<T extends string | number>({ value, options, onChange, label }: { value: T; options: T[]; onChange: (v: T) => void; label: string }) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm text-mute">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button key={String(o)} type="button" onClick={() => onChange(o)} aria-pressed={o === value}
            className={cn("rounded-lg border px-4 py-2 text-sm font-medium", o === value ? "border-brand bg-brand/15" : "border-white/15 text-mute hover:text-white")}>
            {typeof o === "number" && label.startsWith("Duração") ? `${o}h` : o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function TrialGenerator({ initial, resellerId, resellers = [] }: { initial: Trial[]; resellerId: string; resellers?: {id:string;name:string}[] }) {
  const [selectedResellerId, setSelectedResellerId] = useState(resellerId || resellers[0]?.id || "");
  const [tech, setTech] = useState<Tech>("IPTV");
  const [pack, setPack] = useState("Essencial");
  const [hours, setHours] = useState(6);
  const [devices, setDevices] = useState(1);
  const [contact, setContact] = useState("");
  const [error, setError] = useState<string>();
  const [history, setHistory] = useState(initial);
  const [last, setLast] = useState<Trial>();
  const [copied, setCopied] = useState(false);

  async function generate() {
    const r = form.safeParse({ contact });
    if (!r.success) return setError(r.error.issues[0].message);
    if (!selectedResellerId) return setError("Cadastre ou selecione um revendedor antes de solicitar teste.");
    setError(undefined);
    try {
      const res=await fetch("/api/trials",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tech,pack,hours,contact,devices,resellerId:selectedResellerId})});
      const payload=await res.json();if(!res.ok)throw new Error(payload.error??"Erro ao cadastrar teste");
      const t:Trial={...payload.trial,resellerId:selectedResellerId,simulated:true,credential:{user:"Não provisionado",pass:"Não provisionado"}};
      setLast(t);setHistory(h=>[t,...h]);setCopied(false);
    }catch(e){setError(e instanceof Error?e.message:"Falha na operação");}
  }


  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
      <div className="space-y-5">
        <Card className="space-y-5">
          {resellers.length>0 && <label className="block text-sm text-mute">Revendedor
            <select value={selectedResellerId} onChange={e=>setSelectedResellerId(e.target.value)} className="mt-2 w-full rounded-lg border border-white/15 bg-ink px-3 py-2.5 text-white">{resellers.map(r=><option key={r.id} value={r.id}>{r.name}</option>)}</select>
          </label>}
          <Seg label="Tecnologia" value={tech} options={["IPTV", "P2P"] as Tech[]} onChange={(v) => { setTech(v); setPack(packs[v][0]); }} />
          <Seg label="Pacote" value={pack} options={packs[tech]} onChange={setPack} />
          <Seg label="Duração do teste" value={hours} options={durations} onChange={setHours} />
          <Seg label="Dispositivos" value={devices} options={[1, 2, 3, 4]} onChange={setDevices} />
          <label className="block text-sm text-mute">Nome ou WhatsApp do cliente
            <input value={contact} onChange={(e) => setContact(e.target.value)} className="mt-2 w-full rounded-lg border border-white/15 bg-ink px-3 py-2.5 text-white" />
          </label>
          {error && <p role="alert" className="text-sm text-rose-300">{error}</p>}
          <Button onClick={generate} className="w-full py-3.5 text-base"><Zap size={18} />GERAR TESTE</Button>
        </Card>
        {last && (
          <Card className="border-brand/40">
            <div className="flex items-center justify-between"><h3 className="font-semibold">Teste {last.id}</h3><Badge value="pendente" /></div>
            <p className="mt-1 text-xs text-rose-200">Solicitação registrada. Nenhum acesso à transmissão foi provisionado.</p>
            <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div><dt className="text-xs text-mute">Usuário</dt><dd className="font-mono">{last.credential.user}</dd></div>
              <div><dt className="text-xs text-mute">Senha</dt><dd className="font-mono">{last.credential.pass}</dd></div>
              <div className="col-span-2"><dt className="text-xs text-mute">Expira em</dt><dd>{fdatetime(last.expiresAt)}</dd></div>
            </dl>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="ghost" onClick={() => { navigator.clipboard?.writeText(`Solicitação ${last.id} - ${last.tech} - ${fdatetime(last.expiresAt)}`); setCopied(true); }}><Copy size={16} />{copied ? "Copiado" : "Copiar"}</Button>
              <a href={`https://wa.me/?text=${encodeURIComponent(`Solicitação de teste NEXPLAY ${last.id}: pendente de provedor autorizado.`)}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-sm font-semibold hover:bg-white/5"><MessageCircle size={16} />Enviar no WhatsApp</a>
            </div>
          </Card>
        )}
      </div>
      <Card>
        <h3 className="mb-3 text-sm font-semibold">Histórico de testes</h3>
        <ul className="divide-y divide-white/5">
          {history.map((t) => (
            <li key={t.id} className="flex items-center justify-between py-3 text-sm">
              <div><p className="font-medium">{t.contact}</p><p className="text-xs text-mute">{t.id} · {t.tech} · {t.hours}h · {fdatetime(t.createdAt)}</p></div>
              <Badge value={new Date(t.expiresAt) <= new Date() ? "expirado" : "pendente"} />
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
