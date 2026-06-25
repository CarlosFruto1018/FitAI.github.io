import { RecordPage } from "@/components/record/RecordPage";
import { Mic, Camera, Type } from "lucide-react";

const HOW_IT_WORKS = [
  { icon: Mic, title: "Habla", desc: "«Hice 4 series de press banca a 70 kg»", color: "bg-red-50 text-red-500" },
  { icon: Camera, title: "Foto", desc: "Sube la pizarra del gym o la pantalla de la máquina", color: "bg-blue-50 text-blue-500" },
  { icon: Type, title: "Texto", desc: "Escribe lo que hiciste con tus palabras", color: "bg-emerald-50 text-emerald-600" },
];

export default function RecordRoute() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900">Registrar entrenamiento</h1>
        <p className="text-sm text-slate-400 mt-0.5">FitAI te entiende como quieras contárselo</p>
      </div>

      {/* How it works — 3 cards */}
      <div className="grid grid-cols-3 gap-2">
        {HOW_IT_WORKS.map((h) => (
          <div key={h.title} className="bg-white border border-slate-100 rounded-2xl p-3 shadow-sm flex flex-col gap-2">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${h.color}`}>
              <h.icon size={15} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">{h.title}</p>
              <p className="text-[11px] text-slate-400 leading-snug mt-0.5">{h.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Record form */}
      <RecordPage />
    </div>
  );
}
