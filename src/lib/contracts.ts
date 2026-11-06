import { z } from "zod";

// Contratos de API da fase 2. Nenhum endpoint de produção existe ainda: status = "planejado".
export const trialRequest = z.object({
  tech: z.enum(["IPTV", "P2P"]),
  pack: z.string().min(2),
  hours: z.union([z.literal(1), z.literal(2), z.literal(6), z.literal(12), z.literal(24)]),
  contact: z.string().min(3).max(80),
  devices: z.number().int().min(1).max(5),
});
export const customerRequest = z.object({
  name: z.string().min(2), whatsapp: z.string().min(10), plan: z.string(), tech: z.enum(["IPTV", "P2P"]), devices: z.number().int().min(1).max(5),
});
export const integrationVerifyRequest = z.object({ providerId: z.string() });

export const endpoints = [
  { method: "POST", path: "/api/trials", body: "trialRequest", status: "planejado" },
  { method: "GET", path: "/api/trials", status: "planejado" },
  { method: "POST", path: "/api/customers", body: "customerRequest", status: "planejado" },
  { method: "GET", path: "/api/customers", status: "planejado" },
  { method: "PATCH", path: "/api/customers/:id", status: "planejado" },
  { method: "GET", path: "/api/resellers", status: "planejado" },
  { method: "POST", path: "/api/subscriptions", status: "planejado" },
  { method: "GET", path: "/api/invoices", status: "planejado" },
  { method: "POST", path: "/api/integrations/verify", body: "integrationVerifyRequest", status: "planejado" },
] as const;
