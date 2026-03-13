'use client'

import { useState } from 'react'

const TASKS = [
  { id: 1, label: 'Review V2 Architecture deck before Daniel meeting', done: false, priority: 'high' },
  { id: 2, label: 'Sign Franck NDA — sent to inbox 09:14', done: false, priority: 'high' },
  { id: 3, label: 'Wine cellar inventory update (Bordeaux delivery)', done: true, priority: 'low' },
]

const MEETINGS = [
  { time: '09:30', title: 'Strategy Review', who: 'Daniel Amaury', location: 'Room 4B' },
  { time: '12:30', title: 'Investor Lunch', who: 'Franck', location: 'The Ritz, Paris' },
  { time: '18:00', title: 'Legacy Recording', who: 'Personal', location: 'Study' },
]

export default function DeskPage() {
  const [tasks, setTasks] = useState(TASKS)

  function toggleTask(id: number) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const remaining = tasks.filter(t => !t.done).length

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
          <span className="text-[#555555] text-xs glass-card px-3 py-1 rounded-full tracking-wide">DESK</span>
        </div>

        {/* Hero metric */}
        <div className="mt-6 mb-8">
          <p className="text-[#555555] text-xs uppercase tracking-widest mb-1">Focus State</p>
          <h1 className="text-5xl font-bold text-white leading-none">High</h1>
          <p className="text-[#C9A84C] text-sm mt-2">
            {remaining} action{remaining !== 1 ? 's' : ''} remaining today
          </p>
        </div>

        {/* Today's Arc */}
        <p className="text-[#555555] text-xs uppercase tracking-widest mb-3">Today's Arc</p>
        <div className="flex flex-col gap-2 mb-8">
          {MEETINGS.map((m, i) => (
            <div key={i} className="glass-card rounded-2xl p-4 flex gap-4 items-start">
              <div className="text-right min-w-[48px]">
                <p className="text-[#C9A84C] text-sm font-semibold">{m.time}</p>
              </div>
              <div className="flex-1 border-l border-[#1A1A1A] pl-4">
                <p className="text-white font-semibold text-sm">{m.title}</p>
                <p className="text-[#555555] text-xs mt-0.5">{m.who} · {m.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* High-leverage actions */}
        <p className="text-[#555555] text-xs uppercase tracking-widest mb-3">High-Leverage Actions</p>
        <div className="flex flex-col gap-2 mb-8">
          {tasks.filter(t => !t.done).map(t => (
            <button
              key={t.id}
              onClick={() => toggleTask(t.id)}
              className="glass-card rounded-2xl p-4 flex items-center gap-4 text-left active:scale-[0.98] transition-all"
            >
              <div className="w-5 h-5 rounded-full border-2 border-[#C9A84C] flex-shrink-0" />
              <p className="text-white text-sm leading-snug">{t.label}</p>
            </button>
          ))}
          {tasks.filter(t => t.done).map(t => (
            <div
              key={t.id}
              className="rounded-2xl p-4 flex items-center gap-4 opacity-40"
            >
              <div className="w-5 h-5 rounded-full bg-[#333333] flex-shrink-0 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#555555]" />
              </div>
              <p className="text-[#555555] text-sm line-through leading-snug">{t.label}</p>
            </div>
          ))}
        </div>

        {/* Intelligence note */}
        <div className="glass-card rounded-2xl p-4 mb-8 border-l-2 border-[#C9A84C]">
          <p className="text-[#555555] text-xs uppercase tracking-widest mb-1">Intelligence</p>
          <p className="text-white text-sm leading-relaxed italic">
            "Your deep-work window closes at 14:00. Sign the Franck NDA before you head to lunch — it has a same-day deadline."
          </p>
        </div>

      </div>
    </main>
  )
}
