import { Badge, DataList, PageHeader, SimBanner } from "@/components/ui";
import { fdatetime } from "@/lib/utils";
import { endpoints } from "@/lib/contracts";
import { getProviders } from "@/services";

export default async function Integracoes() {
  const rows = await getProviders();
  return (
    <>
      <PageHeader title="Servidores e integrações" desc="Provedores autorizados e saúde das conexões. Credenciais nunca chegam ao navegador." />
      <SimBanner>status e uptime são fictícios. A verificação real usará POST /api/integrations/verify.</SimBanner>
      <DataList rows={rows} cols={[
        { label: "Provedor", render: (p) => p.name, primary: true },
        { label: "Tecnologia", render: (p) => p.tech },
        { label: "Status", render: (p) => <Badge value={p.status} /> },
        { label: "Disponibilidade", render: (p) => `${p.uptime}%` },
        { label: "Última checagem", render: (p) => fdatetime(p.lastCheck) },
      ]} />
      <h2 className="mb-3 mt-8 text-sm font-semibold">Contratos de API (planejados, sem endpoint ativo)</h2>
      <DataList rows={endpoints.map((e) => ({ id: e.method + e.path, ...e }))} cols={[
        { label: "Rota", render: (e) => `${e.method} ${e.path}`, primary: true },
        { label: "Estado", render: (e) => <Badge value="pendente" /> },
      ]} />
    </>
  );
}
