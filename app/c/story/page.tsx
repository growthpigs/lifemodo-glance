'use client'

import { useState } from 'react'

const RECENT_STORIES = [
  {
    id: 1,
    title: 'The Lisbon trip',
    date: '12 Mar 2026',
    duration: '3:42',
    preview: 'That morning we found the hidden pastel de nata shop behind the tram stop…',
  },
  {
    id: 2,
    title: 'Sunday dinner',
    date: '8 Mar 2026',
    duration: '2:15',
    preview: 'Everyone argued about the wine but agreed on the lamb…',
  },
  {
    id: 3,
    title: 'First day with the new car',
    date: '1 Mar 2026',
    duration: '1:58',
    preview: 'The sat-nav kept saying turn right into the sea…',
  },
]

export default function StoryPage() {
  const [recording, setRecording] = useState(false)
  const [playing, setPlaying] = useState<number | null>(null)
  const [recordSeconds, setRecordSeconds] = useState(0)
  const [recordIntervalId, setRecordIntervalId] = useState<ReturnType<typeof setInterval> | null>(null)

  function toggleRecord() {
    if (recording) {
      if (recordIntervalId) clearInterval(recordIntervalId)
      setRecording(false)
      setRecordSeconds(0)
    } else {
      setRecording(true)
      const id = setInterval(() => setRecordSeconds((s) => s + 1), 1000)
      setRecordIntervalId(id)
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
          <span className="text-[#888888] text-xs glass-card px-3 py-1 rounded-full">
            🎙️ Stories
          </span>
        </div>

        <h1 className="text-xl font-semibold text-white mb-1 mt-2">Story Circle</h1>
        <p className="text-[#888888] text-sm mb-6">Capture moments in your own voice.</p>

        {/* Record button — centrepiece */}
        <div className="flex flex-col items-center mb-8">
          <button
            onClick={toggleRecord}
            className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl border-4 transition-all duration-300 active:scale-95 ${
              recording
                ? 'bg-red-500/20 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)] animate-pulse'
                : 'bg-[#C9A84C]/10 border-[#C9A84C]/50 hover:bg-[#C9A84C]/20'
            }`}
          >
            {recording ? '⏹' : '🎤'}
          </button>
          {recording ? (
            <div className="mt-3 text-center">
              <p className="text-red-400 font-semibold text-sm">Recording…</p>
              <p className="text-[#888888] text-lg font-mono mt-1">{formatSecs(recordSeconds)}</p>
            </div>
          ) : (
            <p className="text-[#888888] text-sm mt-3">Tap to record a story</p>
          )}
        </div>

        {/* Playback area — recent stories */}
        <p className="text-[#888888] text-xs uppercase tracking-widest mb-3">Recent stories</p>
        <div className="flex flex-col gap-3">
          {RECENT_STORIES.map((story) => (
            <div key={story.id} className="glass-card rounded-2xl p-4">
              <div className="flex items-start justify-between mb-1">
                <div className="flex-1 pr-3">
                  <p className="text-white font-semibold text-sm">{story.title}</p>
                  <p className="text-[#888888] text-xs mt-0.5">
                    {story.date} · {story.duration}
                  </p>
                </div>
                <button
                  onClick={() => setPlaying(playing === story.id ? null : story.id)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                    playing === story.id
                      ? 'bg-[#C9A84C] text-[#0A0A0A]'
                      : 'bg-[#1A1A1A] text-[#C9A84C]'
                  }`}
                >
                  {playing === story.id ? '⏸' : '▶'}
                </button>
              </div>

              {playing === story.id ? (
                <div className="mt-2">
                  {/* Fake waveform */}
                  <div className="flex items-center gap-0.5 h-8">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-[#C9A84C] rounded-full opacity-70"
                        style={{ height: `${20 + Math.sin(i * 0.8) * 14 + Math.random() * 10}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-[#888888] mt-1">
                    <span>0:00</span>
                    <span>{story.duration}</span>
                  </div>
                </div>
              ) : (
                <p className="text-[#888888] text-xs mt-1 italic">"{story.preview}"</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
