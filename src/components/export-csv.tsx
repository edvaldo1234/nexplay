"use client";
import { Download } from "lucide-react";
import { Button } from "@/components/ui";

export function ExportCsv({ rows, filename }: { rows: Record<string, string | number>[]; filename: string }) {
  function run() {
    if (!rows.length) return;
    const head = Object.keys(rows[0]);
    const csv = [head.join(";"), ...rows.map((r) => head.map((k) => `"${String(r[k]).replace(/"/g, '""')}"`).join(";"))].join("\n");
    const url = URL.createObjectURL(new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: filename });
    a.click();
    URL.revokeObjectURL(url);
  }
  return <Button variant="ghost" onClick={run}><Download size={16} />Exportar CSV</Button>;
}
