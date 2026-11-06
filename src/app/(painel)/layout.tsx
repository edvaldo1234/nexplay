import { Logo } from "@/components/logo";
import { Nav } from "@/components/nav";
import { getCurrentUser } from "@/lib/session";

export default async function PainelLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  return (
    <div className="min-h-screen lg:pl-64">
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col justify-between border-r border-white/10 bg-graphite p-4 lg:flex">
        <div className="space-y-8"><Logo className="px-2 pt-2" /><Nav variant="side" /></div>
        <div className="rounded-lg bg-white/5 p-3 text-sm">
          <p className="font-semibold">{user.name}</p>
          <p className="text-xs capitalize text-mute">{user.role}</p>
        </div>
      </aside>
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-graphite/95 px-4 py-3 backdrop-blur lg:hidden">
        <Logo /><Nav variant="menu" />
      </header>
      <main className="p-4 pb-24 lg:p-8">{children}</main>
      <Nav variant="bottom" />
    </div>
  );
}
