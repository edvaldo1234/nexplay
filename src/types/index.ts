export type Tech = "IPTV" | "P2P";
export type Status = "ativo" | "suspenso" | "expirado" | "pendente";
export type Role = "master" | "revendedor" | "suporte";

export interface AppUser { id: string; name: string; email: string; role: Role; resellerId?: string }
export interface Reseller { id: string; name: string; email: string; status: Status; activationLimit: number; activationsUsed: number; monthlyBilling: number }
export interface Customer { id: string; name: string; whatsapp: string; plan: string; tech: Tech; resellerId: string; activatedAt: string; expiresAt: string; status: Status; devices: number }
export interface Subscription { id: string; customerId: string; tech: Tech; plan: string; price: number; renewsAt: string }
export interface Trial { id: string; tech: Tech; pack: string; hours: number; contact: string; devices: number; credential: { user: string; pass: string }; createdAt: string; expiresAt: string; resellerId: string; simulated: true; status: "pendente_provedor" | "ativo" | "expirado" | "cancelado" }
export interface Invoice { id: string; resellerId: string; period: string; activations: number; amount: number; status: "paga" | "pendente" | "atrasada"; dueAt: string }
export interface Provider { id: string; name: string; tech: Tech; status: "online" | "instavel" | "offline"; uptime: number; lastCheck: string }
export interface CatalogItem { id: string; kind: "canal" | "filme" | "serie"; title: string; license: string; rightsUntil: string; status: Status }
