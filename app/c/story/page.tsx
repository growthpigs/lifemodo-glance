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

        {/* No logo — content starts immediately */}
        <div className="pt-2" />

        {/* Object identity */}
        <div className="mt-4 mb-6">
          <p className="text-[#999999] text-xs uppercase tracking-widest mb-1">Object Memory</p>
          <h1 className="text-xl font-semibold text-white leading-tight">{OBJECT.name}</h1>
          <p className="text-[#C9A84C] text-sm mt-1">{OBJECT.acquired}</p>
        </div>

        {/* Object image - The Souvenir */}
        <div className="glass-card rounded-2xl mb-6 overflow-hidden">
          <img src="/statue.heic" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" alt="The Watcher Souvenir" />
          <div className="p-3 bg-black/40 backdrop-blur-sm">
             <p className="text-[#888888] text-[10px] uppercase tracking-widest">Physical Asset: Souvenir Replica</p>
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

        {/* Museum Wikipedia Reference */}
        <div className="glass-card rounded-2xl mb-8 overflow-hidden bg-[#0F0F0F] border-[#1A1A1A]">
           <div className="p-4 border-b border-[#1A1A1A]">
              <p className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest">Historical Context — Wikipedia Entry</p>
              <h3 className="text-white font-serif text-lg mt-1">The Guardian of Hue</h3>
           </div>
           <img src="/museum.png" className="w-full h-auto border-b border-[#1A1A1A]" alt="Museum Original" />
           <div className="p-4">
              <p className="text-[#888888] text-xs leading-relaxed italic">
                 "This life-size teak carving (c. 1824) was recovered from the Imperial City of Hue. It represents the transition from the physical to the spiritual world. Replicas are rare, with the only known souvenir series commissioned by the carver association in 2011."
              </p>
           </div>
        </div>

        {/* Memory log */}
        <p className="text-[#555555] text-xs uppercase tracking-widest mb-3">Family Memory Log</p>
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
