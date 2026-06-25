"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, TrendingUp, History, MessageCircle, User, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Inicio", icon: LayoutDashboard },
  { href: "/progress", label: "Progreso", icon: TrendingUp },
  { href: "/history", label: "Historial", icon: History },
  { href: "/chat", label: "Consultar IA", icon: MessageCircle },
  { href: "/settings", label: "Perfil", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-100 flex-col py-6 px-4 z-40 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-sm shadow-emerald-200">
          <span className="text-white text-sm font-black tracking-tight">F</span>
        </div>
        <div>
          <span className="text-base font-black text-slate-900 tracking-tight">FitAI</span>
          <p className="text-[10px] text-slate-400 leading-none mt-0.5">Tu entrenador IA</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 flex-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                active
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon
                size={17}
                className={cn(active ? "text-emerald-400" : "text-slate-400")}
                strokeWidth={active ? 2.5 : 2}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Record button */}
      <Link
        href="/record"
        className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm py-3 rounded-xl transition-colors shadow-sm shadow-emerald-200"
      >
        <Plus size={16} strokeWidth={2.5} />
        Registrar entrenamiento
      </Link>
    </aside>
  );
}
