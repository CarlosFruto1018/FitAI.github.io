"use client";

import { useState, useTransition } from "react";
import { AudioRecorder } from "./AudioRecorder";
import { PhotoUpload } from "./PhotoUpload";
import { Mic, Type, Camera, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "text" | "audio" | "photo";

interface ExtractedExercise {
  alias: string;
  sets: { reps: number | null; weight_kg: number | null; duration_sec: number | null }[];
}

interface RecordResult {
  sessionId: string;
  status: "processed" | "queued";
  extracted?: { exercises: ExtractedExercise[]; intent: string };
}

interface RecordPageProps {
  onResult?: (result: RecordResult) => void;
}

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "text", label: "Texto", icon: <Type size={14} /> },
  { id: "audio", label: "Voz", icon: <Mic size={14} /> },
  { id: "photo", label: "Foto", icon: <Camera size={14} /> },
];

export function RecordPage({ onResult }: RecordPageProps) {
  const [tab, setTab] = useState<Tab>("text");
  const [textInput, setTextInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<RecordResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function uploadMedia(blob: Blob, type: "audio" | "image"): Promise<{ storageKey: string; publicUrl: string }> {
    const mimeType = blob.type;
    const presignRes = await fetch(`/api/input/presign?type=${type}&mimeType=${encodeURIComponent(mimeType)}`);
    const presignData = await presignRes.json();
    if (!presignRes.ok) {
      throw new Error(typeof presignData.error === "string" ? presignData.error : "Error al obtener URL de subida");
    }
    const { uploadUrl, storageKey, publicUrl } = presignData;
    await fetch(uploadUrl, { method: "PUT", body: blob, headers: { "Content-Type": mimeType } });
    return { storageKey, publicUrl };
  }

  async function submitText(content: string) {
    setError(null);
    setResult(null);
    const res = await fetch("/api/input", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "text", content }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(typeof err.error === "string" ? err.error : "Error del servidor");
    }
    return res.json() as Promise<RecordResult>;
  }

  async function handleText(e: React.FormEvent) {
    e.preventDefault();
    if (!textInput.trim()) return;
    startTransition(async () => {
      try {
        const data = await submitText(textInput);
        setTextInput("");
        setResult(data);
        onResult?.(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error desconocido");
      }
    });
  }

  async function handleAudio(transcript: string) {
    if (!transcript.trim()) return;
    setError(null);
    setResult(null);
    startTransition(async () => {
      try {
        const data = await submitText(transcript);
        setResult(data);
        onResult?.(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error al procesar el audio");
      }
    });
  }

  async function handlePhoto(file: File) {
    setError(null);
    setResult(null);
    try {
      const { storageKey, publicUrl: storageUrl } = await uploadMedia(file, "image");
      const res = await fetch("/api/input", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "image", storageUrl, storageKey, mimeType: file.type }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setError(typeof err.error === "string" ? err.error : JSON.stringify(err.error ?? "Error"));
        return;
      }
      const data = await res.json();
      setResult(data);
      onResult?.(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al procesar la imagen");
    }
  }

  const detectedExercises = result?.extracted?.exercises ?? [];

  return (
    <div className="flex flex-col gap-5">
      {/* Tab selector */}
      <div className="flex items-center gap-1 bg-slate-100 rounded-2xl p-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => { setTab(t.id); setResult(null); setError(null); }}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
              tab === t.id
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* Detected exercises */}
      {detectedExercises.length > 0 && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl px-4 py-3">
          <p className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5 mb-2.5">
            <Sparkles size={12} />
            FitAI detectó
          </p>
          <div className="flex flex-col gap-2">
            {detectedExercises.map((ex, i) => {
              const setCount = ex.sets.length;
              const firstSet = ex.sets[0];
              const summary = [
                firstSet?.reps ? `${setCount}×${firstSet.reps}` : `${setCount} series`,
                firstSet?.weight_kg ? `${firstSet.weight_kg} kg` : null,
                firstSet?.duration_sec ? `${Math.round(firstSet.duration_sec / 60)} min` : null,
              ].filter(Boolean).join(" · ");
              return (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-slate-800 font-medium">{ex.alias}</span>
                  <span className="text-sm text-slate-500">{summary}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-2xl px-4 py-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Tab content */}
      {tab === "text" && (
        <form onSubmit={handleText} className="flex flex-col gap-4">
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Hice 4 series de press banca con 60 kg, luego 3 de sentadilla a 80 y cardio 15 min..."
            rows={5}
            disabled={isPending}
            className="w-full rounded-2xl bg-white border border-slate-200 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent disabled:opacity-50 shadow-sm leading-relaxed"
          />
          <button
            type="submit"
            disabled={isPending || !textInput.trim()}
            className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm transition-colors disabled:opacity-40 shadow-sm shadow-emerald-200"
          >
            {isPending ? "Guardando..." : "Guardar entrenamiento"}
          </button>
        </form>
      )}

      {tab === "audio" && (
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
          <AudioRecorder onRecorded={handleAudio} disabled={isPending} />
        </div>
      )}

      {tab === "photo" && (
        <PhotoUpload onSelected={handlePhoto} disabled={isPending} />
      )}
    </div>
  );
}
