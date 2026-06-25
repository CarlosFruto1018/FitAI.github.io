"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, TrendingUp, History, MessageCircle, User, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Inicio", icon: LayoutDashboard },
  { href: "/progress", label: "Progreso", icon: TrendingUp },
  { href: "/history", label: "Historial", icon: History },
  { href: "/chat", label: "IA", icon: MessageCircle },
  { href: "/settings", label: "Perfil", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 safe-area-pb">
      <div className="bg-white border-t border-slate-100 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-around max-w-md mx-auto relative">

          {/* First two items */}
          {NAV_ITEMS.slice(0, 2).map((item) => {
            const active = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-1 py-1 px-3 min-w-[56px]"
              >
                <Icon
                  size={22}
                  strokeWidth={active ? 2.5 : 1.75}
                  className={cn(
                    "transition-colors",
                    active ? "text-slate-900" : "text-slate-400"
                  )}
                />
                <span className={cn(
                  "text-[10px] font-medium transition-colors",
                  active ? "text-slate-900" : "text-slate-400"
                )}>
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* FAB central */}
          <Link
            href="/record"
            className="flex flex-col items-center -mt-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-300/50 transition-transform active:scale-95">
              <Plus size={26} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[10px] font-medium text-slate-400 mt-1">Registrar</span>
          </Link>

          {/* Last two items */}
          {NAV_ITEMS.slice(3).map((item) => {
            const active = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-1 py-1 px-3 min-w-[56px]"
              >
                <Icon
                  size={22}
                  strokeWidth={active ? 2.5 : 1.75}
                  className={cn(
                    "transition-colors",
                    active ? "text-slate-900" : "text-slate-400"
                  )}
                />
                <span className={cn(
                  "text-[10px] font-medium transition-colors",
                  active ? "text-slate-900" : "text-slate-400"
                )}>
                  {item.label}
                </span>
              </Link>
            );
          })}

        </div>
      </div>
    </nav>
  );
}
