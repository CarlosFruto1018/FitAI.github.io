import { Mic } from 'lucide-react';

const STATS = [
  { label: 'Esta semana', value: '4 días' },
  { label: 'Volumen', value: '14.2k kg' },
  { label: 'Racha', value: '12 🔥' },
];

const EXERCISES = [
  'Press banca · 4×10 · 80kg',
  'Sentadilla · 3×8 · 100kg',
  'Peso muerto · 3×5 · 120kg',
];

const INPUT_MODES = ['Voz', 'Foto', 'Texto'];

/* ─────────────────────── Iconos del sistema ─────────────────────── */

/** Cuatro barras de señal celular estilo iOS. */
function SignalIcon() {
  return (
    <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
      <rect x="0"    y="8"  width="2.5" height="3"  rx="0.8" fill="#1C1C1E" />
      <rect x="4.25" y="5.5" width="2.5" height="5.5" rx="0.8" fill="#1C1C1E" />
      <rect x="8.5"  y="3"  width="2.5" height="8"  rx="0.8" fill="#1C1C1E" />
      <rect x="12.5" y="0"  width="2.5" height="11" rx="0.8" fill="#1C1C1E" />
    </svg>
  );
}

/** Icono WiFi estilo iOS — dos arcos y punto. */
function WifiIcon() {
  return (
    <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
      <circle cx="7" cy="10" r="1.4" fill="#1C1C1E" />
      <path d="M3.8 6.6a4.5 4.5 0 0 1 6.4 0"
        stroke="#1C1C1E" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M1 3.8a9.5 9.5 0 0 1 12 0"
        stroke="#1C1C1E" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Batería estilo iOS — outline, relleno y terminal positivo. */
function BatteryIcon() {
  return (
    <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
      <rect x="0.75" y="0.75" width="19.5" height="10.5" rx="3"
        stroke="#1C1C1E" strokeOpacity="0.35" strokeWidth="1.5" />
      <rect x="2.5" y="2.5" width="14" height="7" rx="1.5" fill="#1C1C1E" />
      <path d="M22 4v4a2 2 0 0 0 0-4Z" fill="#1C1C1E" fillOpacity="0.4" />
    </svg>
  );
}

/* ─────────────────────── Barra de estado ─────────────────────── */

/**
 * Barra de estado estilo iPhone: hora a la izquierda, Dynamic Island al centro
 * y los tres iconos del sistema a la derecha, todos alineados con la isla.
 */
/**
 * Barra de estado estilo iPhone 15: hora e iconos centrados en el mismo eje
 * vertical que el centro de la Dynamic Island, a izquierda y derecha de ella.
 */
function StatusBar() {
  // La isla empieza en y=9 y mide 20px → su centro está en y=19
  // La hora y los iconos se posicionan con transform para centrar en ese eje.
  return (
    <div className="relative h-[50px] px-[18px]">

      {/* Dynamic Island */}
      <div
        aria-hidden
        className="absolute top-[9px] left-1/2 -translate-x-1/2 bg-black rounded-full"
        style={{ width: 68, height: 20 }}
      />

      {/* Hora — centrada verticalmente con la isla */}
      <span
        className="absolute text-[#1C1C1E] text-[14px] font-semibold tabular-nums leading-none"
        style={{ top: 19, transform: 'translateY(-50%)', left: '14%' }}
      >
        9:41
      </span>

      {/* Iconos — centrados verticalmente con la isla, pegados a la derecha */}
      <div
        className="absolute right-[18px] flex items-center gap-[4px]"
        style={{ top: 19, transform: 'translateY(-50%)' }}
      >
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon />
      </div>

    </div>
  );
}

/* ─────────────────────── Contenido de la app ─────────────────────── */

/** Cabecera con saludo y avatar del usuario. */
function ProfileHeader() {
  return (
    <div className="flex items-center justify-between py-1">
      <div>
        <p className="text-[10px] font-medium" style={{ color: '#94A3B8' }}>Buenas noches</p>
        <p className="font-bold text-[13px]" style={{ color: '#0F172A' }}>Carlos 💪</p>
      </div>
      <div className="w-8 h-8 rounded-full flex items-center justify-center"
        style={{ background: '#10B981', boxShadow: '0 2px 6px rgba(16,185,129,0.3)' }}>
        <span className="text-xs font-black" style={{ color: '#FFFFFF' }}>C</span>
      </div>
    </div>
  );
}

/** Tres métricas semanales del usuario. */
function StatsRow() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {STATS.map((s) => (
        <div key={s.label} className="rounded-2xl p-2 text-center"
          style={{ background: '#F8FAFC', border: '1px solid #F1F5F9' }}>
          <p className="text-[11px] font-bold" style={{ color: '#0F172A' }}>{s.value}</p>
          <p className="text-[8px] mt-0.5" style={{ color: '#94A3B8' }}>{s.label}</p>
        </div>
      ))}
    </div>
  );
}

/** Panel de registro por voz con selector de modo. */
function RecordPanel() {
  return (
    <div className="rounded-2xl p-3" style={{ background: '#F8FAFC', border: '1px solid #F1F5F9' }}>
      <p className="text-[9px] uppercase tracking-widest font-medium mb-2" style={{ color: '#94A3B8' }}>
        Registrar ahora
      </p>
      <div className="flex gap-1 rounded-xl p-0.5 mb-3" style={{ background: 'rgba(148,163,184,0.2)' }}>
        {INPUT_MODES.map((mode, i) => (
          <div
            key={mode}
            className="flex-1 py-1 rounded-[10px] text-center text-[9px] font-semibold"
            style={i === 0
              ? { background: '#FFFFFF', color: '#0F172A', boxShadow: '0 1px 2px rgba(148,163,184,0.2)' }
              : { color: '#94A3B8' }}
          >
            {mode}
          </div>
        ))}
      </div>
      <div className="flex justify-center py-1.5">
        <div className="w-11 h-11 rounded-full flex items-center justify-center"
          style={{ background: '#EF4444', boxShadow: '0 4px 8px rgba(239,68,68,0.3)' }}>
          <Mic size={15} color="#FFFFFF" />
        </div>
      </div>
      <p className="text-center text-[9px] mt-2 font-medium" style={{ color: '#94A3B8' }}>Escuchando…</p>
    </div>
  );
}

/** Ejercicios de la última sesión. */
function LastSessionCard() {
  return (
    <div className="rounded-2xl p-3" style={{ background: '#F8FAFC', border: '1px solid #F1F5F9' }}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-[11px] font-semibold" style={{ color: '#0F172A' }}>Última sesión</p>
        <span className="text-[9px] font-medium" style={{ color: '#10B981' }}>Hoy</span>
      </div>
      {EXERCISES.map((exercise) => (
        <div key={exercise} className="flex items-center gap-2 py-[5px]"
          style={{ borderTop: '1px solid #F1F5F9' }}>
          <div className="w-1 h-1 rounded-full shrink-0" style={{ background: '#34D399' }} />
          <p className="text-[9px]" style={{ color: '#475569' }}>{exercise}</p>
        </div>
      ))}
    </div>
  );
}

/** Notificación de récord personal. */
function PersonalRecordBadge() {
  return (
    <div className="rounded-2xl p-2.5 flex items-center gap-2"
      style={{ background: '#FFFBEB', border: '1px solid #FEF3C7' }}>
      <span className="text-base">🏆</span>
      <div>
        <p className="text-[10px] font-bold" style={{ color: '#D97706' }}>¡Nuevo récord personal!</p>
        <p className="text-[9px]" style={{ color: '#94A3B8' }}>Sentadilla · 105 kg</p>
      </div>
    </div>
  );
}

/* ─────────────────────── Componente principal ─────────────────────── */

/**
 * Maqueta de iPhone 15 Pro (titanio negro) con Dynamic Island, pantalla blanca
 * y botones laterales metálicos. Muestra datos representativos de FitAI.
 */
export function AppMockup() {
  return (
    <div className="relative w-full max-w-[255px] mx-auto select-none">

      {/* ── Cuerpo exterior — titanio oscuro ── */}
      <div
        className="relative rounded-[46px]"
        style={{
          background: 'linear-gradient(160deg, #2C2C2E 0%, #1C1C1E 60%, #2A2A2C 100%)',
          padding: '9px',
          boxShadow: `
            0 0 0 0.5px rgba(255,255,255,0.12),
            0 35px 70px -8px rgba(0,0,0,0.55),
            0 12px 30px -4px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255,255,255,0.14),
            inset 0 -1px 0 rgba(0,0,0,0.3)
          `,
        }}
      >
        {/* Botón silencio */}
        <div aria-hidden className="absolute -left-[2px] top-[80px] w-[2px] h-[28px] rounded-l-full"
          style={{ background: 'linear-gradient(90deg,#3A3A3C,#48484A,#3A3A3C)' }} />
        {/* Volumen + */}
        <div aria-hidden className="absolute -left-[2px] top-[118px] w-[2px] h-[40px] rounded-l-full"
          style={{ background: 'linear-gradient(90deg,#3A3A3C,#48484A,#3A3A3C)' }} />
        {/* Volumen − */}
        <div aria-hidden className="absolute -left-[2px] top-[166px] w-[2px] h-[40px] rounded-l-full"
          style={{ background: 'linear-gradient(90deg,#3A3A3C,#48484A,#3A3A3C)' }} />
        {/* Sleep/wake */}
        <div aria-hidden className="absolute -right-[2px] top-[128px] w-[2px] h-[56px] rounded-r-full"
          style={{ background: 'linear-gradient(270deg,#3A3A3C,#48484A,#3A3A3C)' }} />

        {/* ── Pantalla — forzado light-mode para ser inmune al dark-mode del SO ── */}
        <div
          className="overflow-hidden"
          style={{ borderRadius: '38px', background: '#FFFFFF', colorScheme: 'light' }}
        >
          <StatusBar />

          <div className="px-4 pb-4 pt-1 space-y-2.5">
            <ProfileHeader />
            <StatsRow />
            <RecordPanel />
            <LastSessionCard />
            <PersonalRecordBadge />
          </div>

          {/* Home indicator */}
          <div className="flex justify-center pb-3 pt-1">
            <div className="w-24 h-[5px] bg-slate-200 rounded-full" />
          </div>
        </div>
      </div>

      {/* Resplandor ambiental */}
      <div aria-hidden className="absolute inset-8 bg-emerald-400/20 rounded-full blur-3xl -z-10" />
    </div>
  );
}
