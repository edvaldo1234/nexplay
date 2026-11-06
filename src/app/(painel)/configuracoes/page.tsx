import { Card, PageHeader, SimBanner } from "@/components/ui";

const itens = [["Usuários e permissões","Papéis: master, revendedor e suporte."],["Planos e testes","Preços, durações permitidas e limite de geração por hora."],["Pós-pago","Ciclo de fechamento, vencimento e multa."],["Notificações","Vencimentos, faturas e falhas de integração."],["Marca","Logo, cores e nome exibido."],["Auditoria","Registro de quem fez o quê e quando."]];

export default function Page() {
  return (
    <>
      <PageHeader title="Configurações" desc="Administração da plataforma." />
      <SimBanner>tela de planejamento. Estes módulos serão construídos após a validação das telas prioritárias.</SimBanner>
      <div className="grid gap-3 sm:grid-cols-2">
        {itens.map(([t, d]) => (<Card key={t}><h3 className="font-semibold">{t}</h3><p className="mt-1 text-sm text-mute">{d}</p></Card>))}
      </div>
    </>
  );
}
