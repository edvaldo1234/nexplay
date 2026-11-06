
import { PageHeader, Stat } from "@/components/ui";
import { brl } from "@/lib/utils";
import { getCurrentUser } from "@/lib/session";
import { getDashboard } from "@/services";

export default async function Dashboard() {
  const u = await getCurrentUser();
  const d = await getDashboard(u);
  return (
    <>
      <PageHeader title="Dashboard" desc="Visão geral da operação. Dados cadastrados no banco." />
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        <Stat label="Clientes ativos" value={d.ativos} />
        <Stat label="Clientes suspensos" value={d.suspensos} />
        <Stat label="Testes ativos" value={d.testesAtivos} />
        <Stat label="Testes expirados" value={d.testesExpirados} />
        <Stat label="Revendedores ativos" value={d.revendedores} />
        <Stat label="Assinaturas IPTV" value={d.iptv} />
        <Stat label="Assinaturas P2P" value={d.p2p} />
        <Stat label="Receita do mês" value={brl(d.receita)} />
        <Stat label="Faturas pendentes" value={d.pendentes} />
        <Stat label="Integrações disponíveis" value={d.integracoes} />
      </div>
      
    </>
  );
}
