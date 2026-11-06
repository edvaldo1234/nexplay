import { Plus } from "lucide-react";
import { Badge, Button, DataList, PageHeader, SimBanner } from "@/components/ui";
import { fdate } from "@/lib/utils";
import { getCurrentUser } from "@/lib/session";
import { getCustomers, resellerName } from "@/services";

export default async function Clientes() {
  const rows = await getCustomers(await getCurrentUser());
  return (
    <>
      <PageHeader title="Clientes" desc="Assinantes IPTV e P2P.">
        <a href="/clientes/novo" className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold"><Plus size={16} />Adicionar cliente</a>
      </PageHeader>
      <SimBanner>Assinaturas não são ativadas automaticamente: é necessária uma integração autorizada de transmissão.</SimBanner>
      <DataList rows={rows} cols={[
        { label: "Nome", render: (r) => r.name, primary: true },
        { label: "WhatsApp", render: (r) => r.whatsapp },
        { label: "Plano", render: (r) => r.plan },
        { label: "Tecnologia", render: (r) => r.tech },
        { label: "Revendedor", render: (r) => resellerName(r.resellerId) },
        { label: "Ativação", render: (r) => fdate(r.activatedAt) },
        { label: "Vencimento", render: (r) => fdate(r.expiresAt) },
        { label: "Status", render: (r) => <Badge value={r.status} /> },
        { label: "Dispositivos", render: (r) => r.devices },
        { label: "Ações", render: (r) => (
          <span className="flex gap-3 text-xs text-mute">
            <a className="hover:text-white" href={`/clientes/${r.id}`}>Editar / status</a>
          </span>
        ) },
      ]} />
    </>
  );
}
