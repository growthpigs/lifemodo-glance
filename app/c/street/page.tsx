'use client'

import { useState, useRef } from 'react'

type Stage = 'photo' | 'choice' | 'processing' | 'result'

const STYLES = [
  {
    id: 'christmas',
    emoji: '🎄',
    label: 'PARIS NOËL',
    gradient: 'from-red-800/60 to-red-950/80',
    border: 'border-red-500/30',
    msg: "OKAY. TRANSFORMING YOUR STREET INTO A WINTER WONDERLAND...",
  },
  {
    id: 'rave',
    emoji: '🎉',
    label: 'RAVE PARTY',
    gradient: 'from-purple-800/60 to-purple-950/80',
    border: 'border-purple-500/30',
    msg: "ALRIGHT. TURNING YOUR STREET INTO A RAVE RIGHT NOW...",
  },
  {
    id: 'jelly',
    emoji: '🍧',
    label: 'JELLY WORLD',
    gradient: 'from-pink-700/60 to-pink-950/80',
    border: 'border-pink-500/30',
    msg: "PERFECT. MELTING YOUR STREET INTO JELLY AS WE SPEAK...",
  },
]

export default function StreetPage() {
  const [stage, setStage] = useState<Stage>('photo')
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [statusMsg, setStatusMsg] = useState('')
  const [chosenLabel, setChosenLabel] = useState('')
  const [resultUrl, setResultUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handlePhotoCapture(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setStage('choice')
  }

  async function handleChoice(style: typeof STYLES[0]) {
    setStatusMsg(style.msg)
    setChosenLabel(`${style.emoji} ${style.label}`)
    setStage('processing')

    try {
      const form = new FormData()
      if (file) form.append('photo', file)
      form.append('style', style.id)

      const res = await fetch('/api/street-transform', { method: 'POST', body: form })
      const data = await res.json()
      if (data.imageUrl) {
        setResultUrl(data.imageUrl)
        setStage('result')
      }
    } catch {
      // Stay on processing screen — result will appear when ready
    }
  }

  function reset() {
    setStage('photo')
    setPreview(null)
    setFile(null)
    setResultUrl(null)
    setStatusMsg('')
    setChosenLabel('')
  }

  return (
    <div className="min-h-dvh bg-[#05050f] text-white flex flex-col px-5 pb-10"
      style={{ paddingTop: 'max(env(safe-area-inset-top, 44px), 44px)' }}>

      {/* Header */}
      <div className="mb-8">
        <p className="text-[#888] text-xs tracking-widest uppercase mb-1">LifeModo · Glance</p>
        <h1 className="text-2xl font-bold tracking-tight">Imagination Engine</h1>
      </div>

      {/* STAGE 1 — TAKE PHOTO */}
      {stage === 'photo' && (
        <div className="flex flex-col flex-1">
          <p className="text-[#888] text-sm mb-8">Point your camera at anything outside.</p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 rounded-3xl border border-white/10 bg-gradient-to-br from-blue-700/30 to-blue-950/50 flex flex-col items-center justify-center gap-5 active:scale-[0.98] transition-transform min-h-[280px]"
          >
            <span className="text-7xl">📷</span>
            <div className="text-center">
              <p className="text-white font-bold text-2xl tracking-tight">TAKE A PHOTO</p>
              <p className="text-[#555] text-xs mt-1 uppercase tracking-widest">Live camera · No base images</p>
            </div>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handlePhotoCapture}
            className="hidden"
          />
        </div>
      )}

      {/* STAGE 2 — CHOOSE STYLE */}
      {stage === 'choice' && (
        <div className="flex flex-col flex-1 gap-4">
          <p className="text-[#888] text-sm">Choose your reality.</p>

          {preview && (
            <div
              className="w-full h-40 rounded-2xl overflow-hidden border border-white/10 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${preview})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <p className="absolute bottom-3 left-4 text-[#888] text-xs uppercase tracking-widest">Your photo</p>
            </div>
          )}

          <div className="flex flex-col gap-3 flex-1">
            {STYLES.map((s) => (
              <button
                key={s.id}
                onClick={() => handleChoice(s)}
                className={`py-6 px-5 rounded-2xl bg-gradient-to-br ${s.gradient} border ${s.border} flex items-center justify-between active:scale-[0.98] transition-transform`}
              >
                <span className="text-white font-bold text-xl">{s.emoji} {s.label}</span>
                <span className="text-white/40 text-2xl">→</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STAGE 3 — PROCESSING */}
      {stage === 'processing' && (
        <div className="flex flex-col flex-1 items-center justify-center gap-8">
          <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
            <p className="text-xl font-bold leading-snug bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {statusMsg}
            </p>
            <div className="mt-8 flex justify-center gap-2">
              {[0, 200, 400].map((delay) => (
                <span
                  key={delay}
                  className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </div>
            <p className="text-[#444] text-xs mt-8 uppercase tracking-widest">Generating your image...</p>
          </div>
        </div>
      )}

      {/* STAGE 4 — RESULT */}
      {stage === 'result' && resultUrl && (
        <div className="flex flex-col flex-1 gap-4">
          <p className="text-[#888] text-sm">{chosenLabel} — complete.</p>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={resultUrl}
            alt="Transformed street"
            className="w-full rounded-2xl border border-white/10 shadow-2xl object-cover"
          />

          <button
            onClick={reset}
            className="mt-4 w-full py-4 rounded-2xl border border-white/15 bg-white/5 text-white font-semibold active:scale-[0.98] transition-transform"
          >
            Try Another →
          </button>
        </div>
      )}
    </div>
  )
}
