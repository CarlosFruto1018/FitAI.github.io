import { auth } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { sessions } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { SessionCard } from "@/components/session/SessionCard";
import { History, Dumbbell } from "lucide-react";
import Link from "next/link";

export default async function HistoryPage() {
  const session = await auth();
  const userId = session!.user!.id!;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let allSessions: any[] = [];
  let queryError: string | null = null;

  try {
    allSessions = await db.query.sessions.findMany({
      where: eq(sessions.userId, userId),
      with: {
        workoutSets: { with: { exercise: true }, orderBy: (s, { asc }) => asc(s.createdAt) },
      },
      orderBy: desc(sessions.startedAt),
      limit: 50,
    });
  } catch (e) {
    queryError = e instanceof Error ? e.message : String(e);
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center">
          <History size={16} className="text-emerald-400" />
        </div>
        <div>
          <h1 className="text-xl font-black text-slate-900">Historial</h1>
          {allSessions.length > 0 && (
            <p className="text-xs text-slate-400">{allSessions.length} sesión{allSessions.length !== 1 ? "es" : ""} registradas</p>
          )}
        </div>
      </div>

      {queryError ? (
        <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-xs text-red-600 font-mono break-all">
          {queryError}
        </div>
      ) : allSessions.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-slate-100">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <Dumbbell size={24} className="text-slate-400" />
          </div>
          <p className="text-sm font-semibold text-slate-900 mb-1">Sin sesiones aún</p>
          <p className="text-xs text-slate-400 mb-5">Registra tu primer entrenamiento para verlo aquí.</p>
          <Link
            href="/record"
            className="inline-flex items-center gap-1.5 bg-emerald-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-emerald-400 transition-colors"
          >
            + Registrar entrenamiento
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {allSessions.map((s) => (
            <SessionCard key={s.id} session={s as any} />
          ))}
        </div>
      )}
    </div>
  );
}
