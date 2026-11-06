"use client";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui";

const axis = { stroke: "#A5ADBC", fontSize: 12, tickLine: false, axisLine: false } as const;
const tip = { contentStyle: { background: "#0B0D12", border: "1px solid rgba(255,255,255,.1)", borderRadius: 8 } };

function Box({ title, children }: { title: string; children: React.ReactElement }) {
  return (
    <Card>
      <h3 className="mb-3 text-sm font-semibold">{title}</h3>
      <div className="h-56"><ResponsiveContainer width="100%" height="100%">{children}</ResponsiveContainer></div>
    </Card>
  );
}

type D = Record<string, string | number>[];
export function DashboardCharts({ revenue, growth, conversions, expirations }: { revenue: D; growth: D; conversions: D; expirations: D }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Box title="Receita mensal (R$)">
        <AreaChart data={revenue}>
          <CartesianGrid stroke="rgba(255,255,255,.06)" vertical={false} /><XAxis dataKey="m" {...axis} /><YAxis {...axis} width={48} /><Tooltip {...tip} />
          <Area dataKey="v" stroke="#E11D48" fill="#E11D48" fillOpacity={0.2} name="Receita" />
        </AreaChart>
      </Box>
      <Box title="Crescimento de assinantes">
        <LineChart data={growth}>
          <CartesianGrid stroke="rgba(255,255,255,.06)" vertical={false} /><XAxis dataKey="m" {...axis} /><YAxis {...axis} width={40} /><Tooltip {...tip} />
          <Line dataKey="v" stroke="#FFFFFF" strokeWidth={2} dot={false} name="Assinantes" />
        </LineChart>
      </Box>
      <Box title="Conversão de testes em vendas">
        <BarChart data={conversions}>
          <CartesianGrid stroke="rgba(255,255,255,.06)" vertical={false} /><XAxis dataKey="m" {...axis} /><YAxis {...axis} width={40} /><Tooltip {...tip} /><Legend />
          <Bar dataKey="testes" fill="#A5ADBC" radius={[4, 4, 0, 0]} /><Bar dataKey="vendas" fill="#E11D48" radius={[4, 4, 0, 0]} />
        </BarChart>
      </Box>
      <Box title="Vencimentos nos próximos 7 dias">
        <BarChart data={expirations}>
          <CartesianGrid stroke="rgba(255,255,255,.06)" vertical={false} /><XAxis dataKey="d" {...axis} /><YAxis {...axis} width={32} /><Tooltip {...tip} />
          <Bar dataKey="v" fill="#E11D48" radius={[4, 4, 0, 0]} name="Vencimentos" />
        </BarChart>
      </Box>
    </div>
  );
}
