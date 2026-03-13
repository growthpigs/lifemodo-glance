'use client'

import { useState, useRef, useEffect } from 'react'

const STORIES = [
  {
    id: 1,
    title: 'The Dragon Who Was Afraid of the Dark',
    duration: '8 min',
    narrator: 'James',
    description: 'A brave little dragon discovers that the thing he feared most was actually made of moonlight.',
    audioUrl: null, // swap with real MP3 URL when available
  },
  {
    id: 2,
    title: 'The Island of Lost Socks',
    duration: '6 min',
    narrator: 'Emma',
    description: 'A sock detective travels to a magical island where all the socks that disappeared in the wash have made a kingdom.',
    audioUrl: null,
  },
  {
    id: 3,
    title: 'Papa\'s Vietnam Story',
    duration: '4 min',
    narrator: 'Papa',
    description: 'The time Papa and Maman found a little wooden statue in a market in Hoi An, and why it came home with us.',
    audioUrl: null,
  },
]

export default function KidsPage() {
  const [playing, setPlaying] = useState<number | null>(null)
  const [elapsed, setElapsed] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function togglePlay(id: number) {
    if (playing === id) {
      // pause
      if (intervalRef.current) clearInterval(intervalRef.current)
      setPlaying(null)
    } else {
      setElapsed(0)
      setPlaying(id)
      intervalRef.current = setInterval(() => setElapsed(e => e + 1), 1000)
    }
  }

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  return (
    <main className="min-h-screen bg-[#0A0A0A] flex flex-col">
      <div className="circles-bg" />
      <div className="relative z-10 flex flex-col min-h-screen safe-top safe-bottom px-3">

        {/* Header */}
        <div className="flex items-center justify-between py-4">
          <div>
            <span className="text-white font-bold text-lg">Life</span>
            <span className="text-[#C9A84C] font-bold text-lg">Modo</span>
          </div>
          <span className="text-[#555555] text-xs glass-card px-3 py-1 rounded-full tracking-wide">BEDTIME</span>
        </div>

        {/* Hero */}
        <div className="mt-6 mb-8">
          <p className="text-[#555555] text-xs uppercase tracking-widest mb-1">Tonight's Stories</p>
          <h1 className="text-4xl font-bold text-white leading-tight">Story<br />Time.</h1>
          <p className="text-[#555555] text-sm mt-2">Tap a story to begin.</p>
        </div>

        {/* Story Cards */}
        <div className="flex flex-col gap-4 mb-8">
          {STORIES.map(story => (
            <div key={story.id} className="glass-card rounded-2xl overflow-hidden">
              {/* Top */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1">
                    <p className="text-white font-semibold text-base leading-snug">{story.title}</p>
                    <p className="text-[#555555] text-xs mt-1">{story.duration} · Narrated by {story.narrator}</p>
                  </div>
                  <button
                    onClick={() => togglePlay(story.id)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all active:scale-95 ${
                      playing === story.id
                        ? 'bg-[#C9A84C] text-[#0A0A0A]'
                        : 'bg-[#1A1A1A] border border-[#C9A84C]/30 text-[#C9A84C]'
                    }`}
                  >
                    <span className="text-lg">{playing === story.id ? '▐▐' : '▶'}</span>
                  </button>
                </div>
                <p className="text-[#555555] text-sm leading-relaxed">{story.description}</p>
              </div>

              {/* Playback bar — only visible when playing */}
              {playing === story.id && (
                <div className="border-t border-[#1A1A1A] px-3 py-4">
                  {/* Waveform */}
                  <div className="flex items-center gap-[2px] h-8 mb-3">
                    {Array.from({ length: 50 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-full bg-[#C9A84C]"
                        style={{
                          height: `${30 + Math.sin(i * 0.6) * 20 + Math.cos(i * 1.1) * 15}%`,
                          opacity: i < (elapsed % 50) ? 1 : 0.2,
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-[#555555]">
                    <span>{formatTime(elapsed)}</span>
                    <span>{story.duration}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="glass-card rounded-2xl p-4 border-l-2 border-[#C9A84C] mb-8">
          <p className="text-[#555555] text-xs uppercase tracking-widest mb-1">Tonight</p>
          <p className="text-white text-sm leading-relaxed">
            Lights out at 21:00. Screen time ended 30 minutes ago.
          </p>
        </div>

      </div>
    </main>
  )
}
