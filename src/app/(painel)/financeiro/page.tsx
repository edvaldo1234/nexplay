import { BillingClose } from "@/components/billing-close";
import { Badge, DataList, PageHeader, SimBanner, Stat } from "@/components/ui";
import { ExportCsv } from "@/components/export-csv";
import { brl, fdate } from "@/lib/utils";
import { getCurrentUser } from "@/lib/session";
import { getInvoices, resellerName } from "@/services";

export default async function Financeiro() {
  const inv = await getInvoices(await getCurrentUser());
  const sum = (s: string[]) => inv.filter((i) => s.includes(i.status)).reduce((a, i) => a + i.amount, 0);
  return (
    <>
      <PageHeader title="Financeiro pós-pago" desc="Ativações do mês viram fatura no fechamento.">
        <ExportCsv filename="faturas-nexplay.csv" rows={inv.map((i) => ({ fatura: i.id, revendedor: resellerName(i.resellerId), periodo: i.period, ativacoes: i.activations, valor: i.amount, status: i.status, vencimento: i.dueAt }))} />
      </PageHeader>
      {((await getCurrentUser()).role === "master") && <BillingClose />}
      <SimBanner>Valores consultados do banco. O fechamento pode ser acionado pela API administrativa /api/billing/close após o fim do mês; Pix ainda não está integrado. Apenas assinaturas efetivamente ativas entram no fechamento.</SimBanner>
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Recebido" value={brl(sum(["paga"]))} />
        <Stat label="Pendente" value={brl(sum(["pendente"]))} />
        <Stat label="Em atraso" value={brl(sum(["atrasada"]))} />
        <Stat label="Ativações faturáveis" value={inv.reduce((a, i) => a + i.activations, 0)} />
      </div>
      <DataList rows={inv} cols={[
        { label: "Fatura", render: (i) => i.id, primary: true },
        { label: "Revendedor", render: (i) => resellerName(i.resellerId) },
        { label: "Período", render: (i) => i.period },
        { label: "Ativações", render: (i) => i.activations },
        { label: "Valor", render: (i) => brl(i.amount) },
        { label: "Vencimento", render: (i) => fdate(i.dueAt) },
        { label: "Status", render: (i) => <Badge value={i.status} /> },
      ]} />
    </>
  );
}
