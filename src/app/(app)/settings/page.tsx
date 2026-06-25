import { auth, signOut } from "@/lib/auth";
import { db } from "@/lib/db/client";
import { userProfiles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { SettingsClient } from "./SettingsClient";

export default async function SettingsPage() {
  const session = await auth();
  const userId = session!.user!.id!;

  const profile = await db.query.userProfiles.findFirst({
    where: eq(userProfiles.userId, userId),
  });

  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/login" });
  }

  const user = session!.user!;

  return (
    <div className="flex flex-col gap-5">
      {/* Header + avatar */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-5 flex items-center gap-4 shadow-xl shadow-slate-900/20">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt="" className="w-14 h-14 rounded-2xl ring-2 ring-white/10" />
        ) : (
          <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-white text-xl font-black">
            {user.name?.[0]?.toUpperCase() ?? "A"}
          </div>
        )}
        <div>
          <p className="text-base font-bold text-white">{user.name}</p>
          <p className="text-sm text-white/50">{user.email}</p>
        </div>
      </div>

      <SettingsClient
        profile={{
          fitnessLevel: profile?.fitnessLevel ?? "intermediate",
          preferredUnits: profile?.preferredUnits ?? "kg",
          bodyWeightKg: profile?.bodyWeightKg ?? null,
        }}
        signOutAction={handleSignOut}
      />
    </div>
  );
}
