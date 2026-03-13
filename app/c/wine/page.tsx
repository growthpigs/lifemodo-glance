'use client'

import { useEffect, useState } from 'react'
import { getHealthContext, FALLBACK_DATA, type HealthContext, supabase } from '@/lib/supabase'

function getSleepCorrelation(wineToday: number, sleep: number) {
  if (wineToday === 0) return { msg: "Alcohol-free tonight. Sleep quality should be 🔥", color: "text-green-400" }
  if (wineToday === 1) return { msg: "1 glass typically costs you ~20 min of deep sleep.", color: "text-[#C9A84C]" }
  if (wineToday === 2) return { msg: "2 glasses → HRV drops ~8ms on average. Consider stopping here.", color: "text-[#C9A84C]" }
  return { msg: `${wineToday} glasses will significantly impair sleep quality and tomorrow's readiness.`, color: "text-red-400" }
}

function GlassIcon({ filled }: { filled: boolean }) {
  return (
    <span className={`text-3xl ${filled ? 'text-[#C9A84C]' : 'text-[#1A1A1A]'}`}>🍷</span>
  )
}

export default function WinePage() {
  const [data, setData] = useState<HealthContext>(FALLBACK_DATA)
  const [logging, setLogging] = useState(false)
  const [logMsg, setLogMsg] = useState('')

  useEffect(() => {
    getHealthContext().then(setData)
  }, [])

  const glassesToday = data.wine_glasses_today ?? 0
  const glassesWeek = data.wine_glasses_week ?? 0
  const sleep = data.sleep_hours ?? FALLBACK_DATA.sleep_hours!
  const { msg: correlationMsg, color: correlationColor } = getSleepCorrelation(glassesToday, sleep)

  async function logGlass() {
    setLogging(true)
    try {
      const newCount = glassesToday + 1
      const { error } = await supabase
        .from('health_context')
        .update({
          wine_glasses_today: newCount,
          wine_glasses_week: glassesWeek + 1,
          last_updated: new Date().toISOString(),
        })
        .eq('user_id', 'roderic')
        .order('last_updated', { ascending: false })
        .limit(1)

      if (!error) {
        setData((prev) => ({
          ...prev,
          wine_glasses_today: newCount,
          wine_glasses_week: glassesWeek + 1,
        }))
        setLogMsg('✓ Logged')
      } else {
        setLogMsg('Offline — data not saved')
      }
    } catch {
      setLogMsg('Offline — data not saved')
    }
    setLogging(false)
    setTimeout(() => setLogMsg(''), 3000)
  }

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
            🍷 Wine Circle
          </span>
        </div>

        <h1 className="text-xl font-semibold text-white mb-1 mt-2">Booze Nag</h1>
        <p className="text-[#888888] text-sm mb-6">Honest data, no judgment.</p>

        {/* Glass counter */}
        <div className="glass-card rounded-2xl p-6 mb-5 text-center">
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-3">Glasses today</p>
          <div className="flex justify-center gap-2 mb-4">
            {Array.from({ length: Math.max(4, glassesToday + 1) }).map((_, i) => (
              <GlassIcon key={i} filled={i < glassesToday} />
            ))}
          </div>
          <span className="text-5xl font-bold text-white">{glassesToday}</span>
          <p className="text-[#888888] text-sm mt-1">
            {glassesWeek} this week
          </p>
        </div>

        {/* Sleep correlation message */}
        <div className="glass-card rounded-2xl p-4 mb-5">
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-2">Sleep impact</p>
          <p className={`text-sm font-medium leading-relaxed ${correlationColor}`}>{correlationMsg}</p>

          <div className="mt-3 flex items-center justify-between text-xs text-[#888888]">
            <span>Last night's sleep</span>
            <span className="text-white font-semibold">{sleep}h</span>
          </div>
        </div>

        {/* Weekly bar */}
        <div className="glass-card rounded-2xl p-4 mb-5">
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-2">Weekly total</p>
          <div className="flex items-end gap-1 h-12">
            {Array.from({ length: 7 }).map((_, i) => {
              const h = i === 6 ? glassesToday : Math.floor(Math.random() * 3)
              return (
                <div
                  key={i}
                  className={`flex-1 rounded-sm ${i === 6 ? 'bg-[#C9A84C]' : 'bg-[#1A1A1A]'}`}
                  style={{ height: `${Math.max(8, (h / 4) * 100)}%` }}
                />
              )
            })}
          </div>
          <div className="flex justify-between text-[#888888] text-xs mt-1">
            <span>Mon</span><span className="text-[#C9A84C] font-medium">Today</span>
          </div>
        </div>

        {/* Log glass button */}
        <button
          onClick={logGlass}
          disabled={logging}
          className="w-full py-4 rounded-2xl font-semibold text-base bg-[#C9A84C]/10 border border-[#C9A84C]/40 text-[#C9A84C] hover:bg-[#C9A84C]/20 active:scale-95 transition-all duration-200 disabled:opacity-50"
        >
          {logging ? 'Logging…' : logMsg || '＋ Log a glass'}
        </button>
      </div>
    </main>
  )
}
