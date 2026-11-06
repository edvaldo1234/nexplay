import { Badge, DataList, PageHeader } from "@/components/ui";
import { brl } from "@/lib/utils";
import { getCurrentUser } from "@/lib/session";
import { getResellers } from "@/services";

export default async function Revendedores() {
  const user = await getCurrentUser();
  const rows = await getResellers(user);
  return (
    <>
      <PageHeader title="Revendedores" desc="Limites de ativação e faturamento por revendedor. Cada revendedor vê apenas os próprios dados.">{user.role === "master" && <a href="/revendedores/novo" className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold">Novo revendedor</a>}</PageHeader>
      <DataList rows={rows} cols={[
        { label: "Revendedor", render: (r) => r.name, primary: true },
        { label: "E-mail", render: (r) => r.email },
        { label: "Status", render: (r) => <Badge value={r.status} /> },
        { label: "Ativações", render: (r) => (
          <div className="min-w-32">
            <p className="text-xs">{r.activationsUsed} de {r.activationLimit}</p>
            <div className="mt-1 h-1.5 rounded bg-white/10"><div className="h-full rounded bg-brand" style={{ width: `${(r.activationLimit ? r.activationsUsed / r.activationLimit : 0) * 100}%` }} /></div>
          </div>
        ) },
        { label: "Faturamento do mês", render: (r) => brl(r.monthlyBilling) },
      ]} />
    </>
  );
}
