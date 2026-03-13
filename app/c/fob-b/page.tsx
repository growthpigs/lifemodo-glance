'use client'

import { useEffect, useState } from 'react'
import { getHealthContext, FALLBACK_DATA, type HealthContext } from '@/lib/supabase'

const HOUSEHOLD = [
  { name: 'Roderic', status: 'home', emoji: '🏠', vitals: null },
  { name: 'Partner', status: 'away', emoji: '📍', vitals: null },
]

function PresenceDot({ status }: { status: string }) {
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full ${
        status === 'home' ? 'bg-green-400' : 'bg-[#888888]'
      }`}
    />
  )
}

export default function FobBPage() {
  const [data, setData] = useState<HealthContext>(FALLBACK_DATA)
  const tonight = [
    { time: '19:30', label: 'Dinner prep', done: false },
    { time: '20:00', label: 'Screens off', done: false },
    { time: '22:00', label: 'Sleep window opens', done: false },
  ]

  useEffect(() => {
    getHealthContext().then(setData)
  }, [])

  const readiness = data.readiness_pct ?? FALLBACK_DATA.readiness_pct!
  const hrv = data.hrv_ms ?? FALLBACK_DATA.hrv_ms!
  const hr = data.resting_hr ?? FALLBACK_DATA.resting_hr!
  const sleep = data.sleep_hours ?? FALLBACK_DATA.sleep_hours!

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
            🏠 Dashboard
          </span>
        </div>

        <h1 className="text-xl font-semibold text-white mb-5 mt-2">Household Overview</h1>

        {/* Presence cards */}
        <div className="flex flex-col gap-3 mb-6">
          {HOUSEHOLD.map((person) => (
            <div key={person.name} className="glass-card rounded-2xl p-4 flex items-center gap-3">
              <span className="text-3xl">{person.emoji}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold">{person.name}</span>
                  <PresenceDot status={person.status} />
                  <span className="text-[#888888] text-xs capitalize">{person.status}</span>
                </div>
                {person.name === 'Roderic' && (
                  <p className="text-[#888888] text-xs mt-0.5">
                    HRV {hrv}ms · HR {hr}bpm · Readiness {readiness}%
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Vitals grid */}
        <div className="glass-card rounded-2xl p-4 mb-6">
          <p className="text-[#888888] text-xs mb-3 uppercase tracking-widest">Roderic's Vitals</p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Readiness', value: `${readiness}%`, color: readiness >= 80 ? 'text-green-400' : 'text-[#C9A84C]' },
              { label: 'Sleep', value: `${sleep}h`, color: 'text-white' },
              { label: 'HRV', value: `${hrv}ms`, color: 'text-white' },
              { label: 'Resting HR', value: `${hr}bpm`, color: 'text-white' },
            ].map((v) => (
              <div key={v.label}>
                <p className="text-[#888888] text-xs">{v.label}</p>
                <p className={`font-bold text-xl mt-0.5 ${v.color}`}>{v.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tonight section */}
        <div className="glass-card rounded-2xl p-4">
          <p className="text-[#C9A84C] text-sm font-semibold mb-3">Tonight:</p>
          <div className="flex flex-col gap-2">
            {tonight.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="text-[#888888] text-xs w-12 flex-shrink-0">{item.time}</span>
                <div className={`w-2 h-2 rounded-full ${item.done ? 'bg-green-400' : 'bg-[#1A1A1A] border border-[#333]'}`} />
                <span className={`text-sm ${item.done ? 'text-[#888888] line-through' : 'text-white'}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
