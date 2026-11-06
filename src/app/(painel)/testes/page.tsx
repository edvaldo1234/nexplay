import { PageHeader, SimBanner } from "@/components/ui";
import { TrialGenerator } from "@/features/trials/trial-generator";
import { getCurrentUser } from "@/lib/session";
import { getTrials, getResellers } from "@/services";

export default async function Testes() {
  const u = await getCurrentUser();
  const initial = await getTrials(u);
  const resellers = u.role === "master" ? await getResellers(u) : [];
  return (
    <>
      <PageHeader title="Gerador de testes" desc="Registre solicitações temporárias para seus clientes." />
      <SimBanner>Solicitações de testes são gravadas no Neon, mas nenhum acesso de vídeo é gerado até integrar um provedor autorizado.</SimBanner>
      <TrialGenerator initial={initial} resellerId={u.resellerId ?? ""} resellers={resellers.map(r=>({id:r.id,name:r.name}))} />
    </>
  );
}
