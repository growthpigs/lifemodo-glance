'use client'

import { useState } from 'react'

const OBJECT = {
  name: 'The Watcher',
  acquired: 'Hoi An, Vietnam — 2011',
  material: 'Lacquered teak wood',
  artist: 'Unknown carver, Old Quarter market',
  story: `We found it on a Tuesday morning in the Old Quarter, in a stall that was barely wider than a doorway. The carver was maybe seventy. He didn't speak French or English. He held it up to the light and said one word — "guardian."

We were on our first long trip together. We had just decided, the night before over rice wine, that we were going to build something together. We bought it for three hundred thousand dong and carried it in hand luggage all the way home.

It has been on the same shelf for fifteen years.`,
  memories: [
    { date: 'Mar 2026', text: 'Showed it to the kids for the first time. They named it "Monsieur Bois."' },
    { date: 'Jun 2024', text: 'Karim recorded the full story of the Vietnam trip. 12 minutes. Filed.' },
    { date: 'Jan 2023', text: 'Moved to the study after the renovation. First object placed.' },
  ]
}

export default function StoryPage() {
  const [recording, setRecording] = useState(false)
  const [recordSeconds, setRecordSeconds] = useState(0)
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval> | null>(null)
  const [expanded, setExpanded] = useState(false)

  function toggleRecord() {
    if (recording) {
      if (intervalId) clearInterval(intervalId)
      setRecording(false)
      setRecordSeconds(0)
    } else {
      setRecording(true)
      const id = setInterval(() => setRecordSeconds(s => s + 1), 1000)
      setIntervalId(id)
    }
  }

  const formatSecs = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  return (
    <main className="min-h-screen bg-[#0A0A0A] flex flex-col">
      <div className="circles-bg" />
      <div className="relative z-10 flex flex-col min-h-screen safe-top safe-bottom px-5">

        {/* Header */}
        <div className="flex items-center justify-between py-4">
          <div>
            <span className="text-white font-bold text-lg">Life</span>
            <span className="text-[#C9A84C] font-bold text-lg">Modo</span>
          </div>
          <span className="text-[#555555] text-xs glass-card px-3 py-1 rounded-full tracking-wide">STORY CIRCLE</span>
        </div>

        {/* Object identity */}
        <div className="mt-6 mb-6">
          <p className="text-[#555555] text-xs uppercase tracking-widest mb-1">Object Memory</p>
          <h1 className="text-4xl font-bold text-white leading-tight">{OBJECT.name}</h1>
          <p className="text-[#C9A84C] text-sm mt-2">{OBJECT.acquired}</p>
        </div>

        {/* Object image placeholder — replace with real photo */}
        <div className="glass-card rounded-2xl mb-6 overflow-hidden" style={{ aspectRatio: '4/3' }}>
          <div className="w-full h-full bg-[#0D0D0D] flex flex-col items-center justify-center border border-[#1A1A1A] rounded-2xl">
            {/* Stylized statue silhouette */}
            <svg viewBox="0 0 120 160" width="96" height="128" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="60" cy="30" rx="18" ry="18" fill="#1A1A1A" stroke="#C9A84C" strokeWidth="1"/>
              <rect x="38" y="48" width="44" height="60" rx="8" fill="#1A1A1A" stroke="#C9A84C" strokeWidth="1"/>
              <rect x="20" y="55" width="20" height="8" rx="4" fill="#1A1A1A" stroke="#C9A84C" strokeWidth="1" transform="rotate(-10 20 55)"/>
              <rect x="80" y="55" width="20" height="8" rx="4" fill="#1A1A1A" stroke="#C9A84C" strokeWidth="1" transform="rotate(10 80 55)"/>
              <rect x="42" y="108" width="14" height="40" rx="4" fill="#1A1A1A" stroke="#C9A84C" strokeWidth="1"/>
              <rect x="64" y="108" width="14" height="40" rx="4" fill="#1A1A1A" stroke="#C9A84C" strokeWidth="1"/>
            </svg>
            <p className="text-[#333333] text-xs mt-4 tracking-widest uppercase">Tap to view photo</p>
          </div>
        </div>

        {/* Object provenance */}
        <div className="glass-card rounded-2xl p-5 mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[#555555] text-xs uppercase tracking-widest mb-1">Material</p>
              <p className="text-white text-sm font-medium">{OBJECT.material}</p>
            </div>
            <div>
              <p className="text-[#555555] text-xs uppercase tracking-widest mb-1">Origin</p>
              <p className="text-white text-sm font-medium">{OBJECT.artist}</p>
            </div>
          </div>
        </div>

        {/* The story */}
        <div className="glass-card rounded-2xl p-5 mb-4 border-l-2 border-[#C9A84C]">
          <p className="text-[#555555] text-xs uppercase tracking-widest mb-3">The Story</p>
          <p className="text-white text-sm leading-relaxed">
            {expanded ? OBJECT.story : OBJECT.story.slice(0, 180) + '…'}
          </p>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[#C9A84C] text-xs mt-3 tracking-wide uppercase"
          >
            {expanded ? 'Show less' : 'Read full story'}
          </button>
        </div>

        {/* Memory log */}
        <p className="text-[#555555] text-xs uppercase tracking-widest mb-3">Memory Log</p>
        <div className="flex flex-col gap-2 mb-6">
          {OBJECT.memories.map((m, i) => (
            <div key={i} className="glass-card rounded-xl p-4 flex gap-4">
              <p className="text-[#C9A84C] text-xs font-semibold min-w-[52px]">{m.date}</p>
              <p className="text-[#888888] text-sm leading-snug">{m.text}</p>
            </div>
          ))}
        </div>

        {/* Record new memory */}
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={toggleRecord}
            className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 transition-all active:scale-95 text-xl ${
              recording
                ? 'bg-red-500/20 border-2 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                : 'bg-[#C9A84C]/10 border-2 border-[#C9A84C]/40 text-[#C9A84C]'
            }`}
          >
            {recording ? '■' : '●'}
          </button>
          <div>
            <p className="text-white text-sm font-medium">
              {recording ? `Recording · ${formatSecs(recordSeconds)}` : 'Add a Memory'}
            </p>
            <p className="text-[#555555] text-xs mt-0.5">
              {recording ? 'Tap to stop and save' : 'Your voice, transcribed and indexed forever'}
            </p>
          </div>
        </div>

      </div>
    </main>
  )
}
