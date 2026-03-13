'use client'

import { useState } from 'react'

const LAST_SESSION = {
  date: 'Yesterday',
  exercises: [
    { name: 'Bench Press', sets: '4×8', weight: '80kg', lastPR: '82.5kg' },
    { name: 'Squat', sets: '3×6', weight: '100kg', lastPR: '105kg' },
    { name: 'Deadlift', sets: '3×5', weight: '120kg', lastPR: '125kg' },
    { name: 'Pull-ups', sets: '3×10', weight: 'BW', lastPR: '+5kg' },
  ],
}

type Phase = 'pre' | 'active' | 'post'

export default function WeightsPage() {
  const [phase, setPhase] = useState<Phase>('pre')
  const [elapsed, setElapsed] = useState(0)
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval> | null>(null)

  function startWorkout() {
    setPhase('active')
    const id = setInterval(() => setElapsed((e) => e + 1), 1000)
    setIntervalId(id)
  }

  function endWorkout() {
    if (intervalId) clearInterval(intervalId)
    setPhase('post')
  }

  const formatTime = (s: number) =>
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
            🏋️ Weights
          </span>
        </div>

        {phase === 'pre' && (
          <>
            <h1 className="text-xl font-semibold text-white mb-1 mt-2">Ready to lift?</h1>
            <p className="text-[#888888] text-sm mb-6">{LAST_SESSION.date}'s session</p>

            {/* Last session recap */}
            <div className="flex flex-col gap-3 mb-6">
              {LAST_SESSION.exercises.map((ex) => (
                <div key={ex.name} className="glass-card rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold text-sm">{ex.name}</p>
                    <p className="text-[#888888] text-xs mt-0.5">{ex.sets} · {ex.weight}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#888888] text-xs">PR</p>
                    <p className="text-[#C9A84C] text-sm font-semibold">{ex.lastPR}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={startWorkout}
              className="w-full py-4 rounded-2xl font-semibold text-base bg-green-500/10 border border-green-500/40 text-green-400 hover:bg-green-500/20 active:scale-95 transition-all"
            >
              ▶ Start Session
            </button>
          </>
        )}

        {phase === 'active' && (
          <>
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="text-8xl font-mono font-bold text-[#C9A84C] mb-2">
                {formatTime(elapsed)}
              </div>
              <p className="text-[#888888] text-sm mb-10">Session in progress</p>

              <div className="w-full flex flex-col gap-3">
                <div className="glass-card rounded-2xl p-4 text-center">
                  <p className="text-[#888888] text-xs uppercase tracking-widest mb-1">Current set reminder</p>
                  <p className="text-white font-semibold">Bench Press — 80kg × 8 reps</p>
                </div>
              </div>
            </div>

            <button
              onClick={endWorkout}
              className="w-full py-4 rounded-2xl font-semibold text-base bg-red-500/10 border border-red-500/40 text-red-400 hover:bg-red-500/20 active:scale-95 transition-all mb-4"
            >
              ■ End Session
            </button>
          </>
        )}

        {phase === 'post' && (
          <>
            <h1 className="text-xl font-semibold text-white mb-1 mt-2">Session complete 💪</h1>
            <p className="text-[#888888] text-sm mb-6">Duration: {formatTime(elapsed)}</p>

            <div className="glass-card rounded-2xl p-5 mb-5 text-center">
              <p className="text-[#888888] text-xs uppercase tracking-widest mb-2">Total time</p>
              <p className="text-5xl font-bold text-[#C9A84C]">{formatTime(elapsed)}</p>
            </div>

            <div className="glass-card rounded-2xl p-4 mb-6">
              <p className="text-[#888888] text-xs uppercase tracking-widest mb-3">Log notes (optional)</p>
              <textarea
                className="w-full bg-transparent text-white text-sm resize-none outline-none placeholder-[#333] h-20"
                placeholder="Any PRs? How did you feel? Injuries?"
              />
            </div>

            <button
              onClick={() => { setPhase('pre'); setElapsed(0) }}
              className="w-full py-4 rounded-2xl font-semibold text-base bg-[#C9A84C]/10 border border-[#C9A84C]/40 text-[#C9A84C] hover:bg-[#C9A84C]/20 active:scale-95 transition-all"
            >
              Done
            </button>
          </>
        )}
      </div>
    </main>
  )
}
