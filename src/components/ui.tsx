import { cn } from "@/lib/utils";

export function Card({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-xl border border-white/10 bg-graphite p-4 md:p-5", className)} {...p} />;
}

export function Button({ variant = "primary", className, ...p }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors disabled:opacity-50",
        variant === "primary" ? "bg-brand text-white hover:bg-rose-600" : "border border-white/15 text-white hover:bg-white/5",
        className,
      )}
      {...p}
    />
  );
}

const tone: Record<string, string> = {
  ativo: "bg-emerald-500/15 text-emerald-300", paga: "bg-emerald-500/15 text-emerald-300", online: "bg-emerald-500/15 text-emerald-300",
  pendente: "bg-amber-500/15 text-amber-300", instavel: "bg-amber-500/15 text-amber-300",
  suspenso: "bg-rose-500/15 text-rose-300", atrasada: "bg-rose-500/15 text-rose-300", offline: "bg-rose-500/15 text-rose-300",
  expirado: "bg-white/10 text-mute",
};
export const Badge = ({ value }: { value: string }) => (
  <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium capitalize", tone[value] ?? "bg-white/10 text-mute")}>{value}</span>
);

export function PageHeader({ title, desc, children }: { title: string; desc?: string; children?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {desc && <p className="mt-1 max-w-prose text-sm text-mute">{desc}</p>}
      </div>
      {children}
    </div>
  );
}

export const Stat = ({ label, value, hint }: { label: string; value: React.ReactNode; hint?: string }) => (
  <Card>
    <p className="text-sm text-mute">{label}</p>
    <p className="mt-1 text-2xl font-bold">{value}</p>
    {hint && <p className="mt-1 text-xs text-mute">{hint}</p>}
  </Card>
);

export const SimBanner = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-5 rounded-lg border border-brand/40 bg-brand/10 px-4 py-2.5 text-sm text-rose-100">
    <strong>Simulado:</strong> {children}
  </div>
);

// Tabela no desktop, cards no celular (sem rolagem horizontal). Componente de servidor: sem hooks.
export type Col<T> = { label: string; render: (r: T) => React.ReactNode; primary?: boolean };
export function DataList<T extends { id: string }>({ rows, cols }: { rows: T[]; cols: Col<T>[] }) {
  const primary = cols.find((c) => c.primary) ?? cols[0];
  return (
    <>
      <div className="hidden overflow-x-auto rounded-xl border border-white/10 md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-graphite text-mute">
            <tr>{cols.map((c) => <th key={c.label} className="whitespace-nowrap px-4 py-3 font-medium">{c.label}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-white/5 hover:bg-white/[0.03]">
                {cols.map((c) => <td key={c.label} className="whitespace-nowrap px-4 py-3">{c.render(r)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="space-y-3 md:hidden">
        {rows.map((r) => (
          <li key={r.id} className="rounded-xl border border-white/10 bg-graphite p-4">
            <div className="mb-2 font-semibold">{primary.render(r)}</div>
            <dl className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
              {cols.filter((c) => c !== primary).map((c) => (
                <div key={c.label}><dt className="text-xs text-mute">{c.label}</dt><dd>{c.render(r)}</dd></div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
}
