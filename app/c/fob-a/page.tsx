'use client'

import { useEffect, useState } from 'react'
import { getHealthContext, FALLBACK_DATA, type HealthContext } from '@/lib/supabase'
import HealthRing from '@/components/HealthRing'
import ActionCard from '@/components/ActionCard'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

function HrvTrend({ hrv }: { hrv: number }) {
  // Simple heuristic: ≥55ms = up, <45ms = down, else flat
  const arrow = hrv >= 55 ? '↑' : hrv < 45 ? '↓' : '→'
  const color = hrv >= 55 ? 'text-green-400' : hrv < 45 ? 'text-red-400' : 'text-yellow-400'
  return <span className={color}>{arrow}</span>
}

export default function FobAPage() {
  const [data, setData] = useState<HealthContext>(FALLBACK_DATA)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Show fallback instantly, hydrate with real data
    getHealthContext().then((d) => {
      setData(d)
      setLoaded(true)
    })
  }, [])

  const readiness = data.readiness_pct ?? FALLBACK_DATA.readiness_pct!
  const hrv = data.hrv_ms ?? FALLBACK_DATA.hrv_ms!
  const sleep = data.sleep_hours ?? FALLBACK_DATA.sleep_hours!
  const hr = data.resting_hr ?? FALLBACK_DATA.resting_hr!

  const actions = [
    { icon: '☀️', label: 'Morning Brief', variant: 'default' as const },
    { icon: '🎤', label: 'Voice Note', variant: 'default' as const },
    { icon: '📞', label: 'Call Coach', variant: 'gold' as const, href: 'tel:+33775854958' },
    { icon: '📋', label: 'Today', variant: 'default' as const },
  ]

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
            ⚡ Capture
          </span>
        </div>

        {/* Greeting */}
        <div className="mt-4 mb-6">
          <h1 className="text-2xl font-semibold text-white">
            {getGreeting()}, Roderic.
          </h1>
          {loaded && (
            <p className="text-[#888888] text-xs mt-1">
              Updated {new Date(data.last_updated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          )}
        </div>

        {/* Readiness Ring — centrepiece */}
        <div className="flex justify-center mb-8">
          <HealthRing percentage={readiness} size={200} strokeWidth={14} label="Ready" />
        </div>

        {/* Vitals row */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          <div className="stat-pill flex items-center gap-1.5">
            <span className="text-[#888888]">HRV</span>
            <span className="font-semibold">{hrv}ms</span>
            <HrvTrend hrv={hrv} />
          </div>
          <div className="stat-pill flex items-center gap-1.5">
            <span className="text-[#888888]">Sleep</span>
            <span className="font-semibold">{sleep}h</span>
          </div>
          <div className="stat-pill flex items-center gap-1.5">
            <span className="text-[#888888]">HR</span>
            <span className="font-semibold">{hr}bpm</span>
          </div>
        </div>

        {/* Action cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {actions.map((a) => (
            <ActionCard
              key={a.label}
              icon={a.icon}
              label={a.label}
              variant={a.variant}
              href={a.href}
            />
          ))}
        </div>

        {/* Step count bar */}
        <div className="glass-card rounded-2xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#888888] text-sm">Steps today</span>
            <span className="text-white font-semibold text-sm">
              {(data.step_count ?? FALLBACK_DATA.step_count!).toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-[#1A1A1A] rounded-full h-2">
            <div
              className="h-2 rounded-full bg-[#C9A84C] transition-all duration-700"
              style={{ width: `${Math.min(100, ((data.step_count ?? 0) / 10000) * 100)}%` }}
            />
          </div>
          <p className="text-[#888888] text-xs mt-1">Goal: 10,000 steps</p>
        </div>
      </div>
    </main>
  )
}
