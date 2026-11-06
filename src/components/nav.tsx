"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Boxes, Clapperboard, FlaskConical, Menu, Server, Settings, Store, Users, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/clientes", label: "Clientes", icon: Users },
  { href: "/testes", label: "Testes", icon: FlaskConical },
  { href: "/financeiro", label: "Financeiro", icon: Wallet },
  { href: "/revendedores", label: "Revendedores", icon: Store },
  { href: "/conteudo", label: "Conteúdo", icon: Clapperboard },
  { href: "/integracoes", label: "Integrações", icon: Server },
  { href: "/configuracoes", label: "Configurações", icon: Settings },
];

export function Nav({ variant }: { variant: "side" | "bottom" | "menu" }) {
  const path = usePathname();
  const on = (h: string) => path.startsWith(h);

  if (variant === "bottom") {
    return (
      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-white/10 bg-graphite/95 backdrop-blur lg:hidden" aria-label="Principal">
        {items.slice(0, 5).map(({ href, label, icon: I }) => (
          <Link key={href} href={href} className={cn("flex flex-col items-center gap-0.5 py-2.5 text-[11px]", on(href) ? "text-brand" : "text-mute")}>
            <I size={20} />{label}
          </Link>
        ))}
      </nav>
    );
  }
  const list = (
    <ul className="space-y-1">
      {items.map(({ href, label, icon: I }) => (
        <li key={href}>
          <Link href={href} className={cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium", on(href) ? "bg-brand/15 text-white" : "text-mute hover:bg-white/5 hover:text-white")}>
            <I size={18} className={on(href) ? "text-brand" : ""} />{label}
          </Link>
        </li>
      ))}
    </ul>
  );
  if (variant === "side") return <nav aria-label="Principal">{list}</nav>;
  return (
    <details className="relative">
      <summary className="flex cursor-pointer list-none items-center rounded-lg border border-white/15 p-2" aria-label="Menu"><Menu size={20} /></summary>
      <div className="absolute right-0 top-12 w-60 rounded-xl border border-white/10 bg-graphite p-2">{list}</div>
    </details>
  );
}
