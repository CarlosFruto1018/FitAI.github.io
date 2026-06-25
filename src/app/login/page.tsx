import { signIn } from "@/lib/auth";
import { Mic, Camera, TrendingUp, MessageCircle, Zap, Shield } from "lucide-react";

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

/* ── Mini UI mockups ── */
function DashboardMockup() {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="h-2 w-16 bg-white/20 rounded-full mb-1.5" />
          <div className="h-3.5 w-24 bg-white/60 rounded-full" />
        </div>
        <div className="w-7 h-7 rounded-full bg-emerald-500/80" />
      </div>
      {/* Fake hero card */}
      <div className="bg-white/10 rounded-xl p-3 flex items-center gap-3 mb-3">
        <div className="w-14 h-14 rounded-full border-4 border-emerald-400/60 flex items-center justify-center">
          <span className="text-white font-black text-sm">80%</span>
        </div>
        <div className="flex-1">
          <div className="h-2 w-20 bg-white/20 rounded-full mb-2" />
          <div className="h-3 w-14 bg-white/60 rounded-full mb-1" />
          <div className="h-2 w-24 bg-white/20 rounded-full" />
        </div>
      </div>
      {/* Fake stat row */}
      <div className="grid grid-cols-3 gap-1.5">
        {["12.4k kg", "7 días", "3 PRs"].map((v) => (
          <div key={v} className="bg-white/10 rounded-lg py-2 text-center">
            <p className="text-white text-xs font-bold leading-none">{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecordMockup() {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
      <div className="h-3 w-20 bg-white/60 rounded-full mb-3" />
      {/* Tabs */}
      <div className="flex gap-1 bg-white/10 rounded-xl p-1 mb-3">
        {["Texto", "Voz", "Foto"].map((t, i) => (
          <div key={t} className={`flex-1 py-1.5 rounded-lg text-center text-[10px] font-medium ${i === 1 ? "bg-white text-slate-900" : "text-white/50"}`}>
            {t}
          </div>
        ))}
      </div>
      {/* Mic button */}
      <div className="flex flex-col items-center gap-2 py-2">
        <div className="w-14 h-14 rounded-full bg-red-500/80 flex items-center justify-center shadow-lg shadow-red-500/30">
          <Mic size={20} className="text-white" />
        </div>
        <div className="h-2 w-28 bg-white/20 rounded-full" />
      </div>
      {/* Detected */}
      <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-xl px-3 py-2 mt-1">
        <div className="h-2 w-16 bg-emerald-400/60 rounded-full mb-2" />
        {["Press banca · 4×10 · 70 kg", "Sentadilla · 3×8 · 90 kg"].map((e) => (
          <div key={e} className="h-2 w-full bg-white/20 rounded-full mb-1.5 last:mb-0" />
        ))}
      </div>
    </div>
  );
}

function ChatMockup() {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
      <div className="h-3 w-24 bg-white/60 rounded-full mb-3" />
      <div className="flex flex-col gap-2 mb-3">
        <div className="self-start flex gap-2 items-start">
          <div className="w-5 h-5 rounded-lg bg-slate-700 shrink-0" />
          <div className="bg-white/10 rounded-xl rounded-tl-sm px-3 py-2 max-w-[80%]">
            <div className="h-2 w-36 bg-white/40 rounded-full mb-1" />
            <div className="h-2 w-24 bg-white/25 rounded-full" />
          </div>
        </div>
        <div className="self-end bg-slate-700/80 rounded-xl rounded-tr-sm px-3 py-2 max-w-[70%]">
          <div className="h-2 w-28 bg-white/50 rounded-full" />
        </div>
        <div className="self-start flex gap-2 items-start">
          <div className="w-5 h-5 rounded-lg bg-slate-700 shrink-0" />
          <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-xl rounded-tl-sm px-3 py-2 max-w-[80%]">
            <div className="h-2 w-32 bg-white/40 rounded-full mb-1" />
            <div className="h-2 w-20 bg-white/25 rounded-full" />
          </div>
        </div>
      </div>
      {/* Input */}
      <div className="flex gap-2">
        <div className="flex-1 h-8 bg-white/10 rounded-xl border border-white/10" />
        <div className="w-8 h-8 rounded-xl bg-slate-700 shrink-0" />
      </div>
    </div>
  );
}

const FEATURES = [
  { icon: Mic, title: "Voz natural", desc: "Habla y FitAI entiende tus series, pesos y reps automáticamente.", color: "text-red-400" },
  { icon: Camera, title: "Foto del gym", desc: "Sube una foto de la pizarra o máquina y la IA lo registra por ti.", color: "text-blue-400" },
  { icon: TrendingUp, title: "Progresión real", desc: "Gráficas de carga por ejercicio. Detecta tus récords al instante.", color: "text-emerald-400" },
  { icon: MessageCircle, title: "Pregúntale a tu data", desc: "«¿Cuánto hice en sentadilla el lunes?» — respuesta inmediata.", color: "text-violet-400" },
  { icon: Zap, title: "Instantáneo", desc: "Sin formularios ni menús. En 5 segundos tu sesión está guardada.", color: "text-yellow-400" },
  { icon: Shield, title: "Solo tuyo", desc: "Tus datos siempre privados, en tu cuenta personal.", color: "text-slate-400" },
];

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">

      {/* ── LEFT / HERO ── */}
      <div className="relative lg:w-[58%] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col justify-between p-8 lg:p-12 overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <span className="text-white font-black text-sm">F</span>
          </div>
          <span className="text-white font-black text-lg tracking-tight">FitAI</span>
        </div>

        {/* Hero text */}
        <div className="relative my-10 lg:my-0">
          <p className="text-emerald-400 text-sm font-semibold tracking-wide uppercase mb-4">Tu entrenador inteligente</p>
          <h1 className="text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-4">
            Registra tu gym<br />
            <span className="text-emerald-400">en segundos.</span>
          </h1>
          <p className="text-slate-400 text-base leading-relaxed max-w-md">
            Habla, saca una foto o escribe. FitAI extrae tus series, pesos y reps automáticamente — y te muestra cómo progresas.
          </p>

          {/* App mockups — visible en desktop */}
          <div className="hidden lg:grid grid-cols-3 gap-3 mt-10">
            <DashboardMockup />
            <RecordMockup />
            <ChatMockup />
          </div>

          {/* Features grid — visible en mobile */}
          <div className="grid grid-cols-2 gap-3 mt-8 lg:hidden">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white/5 border border-white/10 rounded-xl p-3">
                <f.icon size={16} className={`${f.color} mb-2`} />
                <p className="text-white text-xs font-semibold mb-0.5">{f.title}</p>
                <p className="text-slate-400 text-[11px] leading-snug">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features grid — desktop bottom */}
        <div className="relative hidden lg:grid grid-cols-3 gap-3 mt-8">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex items-start gap-2.5">
              <f.icon size={15} className={`${f.color} mt-0.5 shrink-0`} />
              <div>
                <p className="text-white text-xs font-semibold">{f.title}</p>
                <p className="text-slate-500 text-[11px] leading-snug mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT / LOGIN ── */}
      <div className="lg:w-[42%] flex flex-col items-center justify-center px-8 py-12 lg:px-14">
        <div className="w-full max-w-sm flex flex-col gap-6">

          {/* Heading */}
          <div>
            <h2 className="text-2xl font-black text-slate-900">Empieza gratis</h2>
            <p className="text-slate-500 text-sm mt-1">Sin tarjeta de crédito. Listo en 10 segundos.</p>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-2xl px-4 py-3">
            <div className="flex -space-x-2">
              {["bg-emerald-500", "bg-indigo-500", "bg-orange-500", "bg-rose-500"].map((c, i) => (
                <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-white flex items-center justify-center`}>
                  <span className="text-white text-[9px] font-bold">{["C", "M", "A", "L"][i]}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-600">
              <span className="font-semibold text-emerald-700">+120 atletas</span> ya registran sus entrenos con FitAI
            </p>
          </div>

          {/* Sign in */}
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/dashboard" });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-700 text-white font-semibold py-4 rounded-2xl transition-colors shadow-sm text-sm"
            >
              <GoogleIcon />
              Continuar con Google
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200" />
            <p className="text-xs text-slate-400">¿Cómo funciona?</p>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-3">
            {[
              { step: "1", title: "Entra al gym", desc: "Abre FitAI antes o durante tu sesión." },
              { step: "2", title: "Registra como quieras", desc: "Voz, foto o texto — lo que sea más cómodo en el momento." },
              { step: "3", title: "FitAI hace el resto", desc: "Extrae los datos, detecta PRs y actualiza tu progreso." },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                  {s.step}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{s.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-400 text-center">
            Al continuar aceptas los Términos de Servicio y Política de Privacidad.
          </p>
        </div>
      </div>
    </div>
  );
}
