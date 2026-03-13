'use client'

import HealthRing from '@/components/HealthRing'

export default function AlarmPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] flex flex-col">
      <div className="circles-bg" />
      <div className="relative z-10 flex flex-col min-h-screen safe-top safe-bottom px-3">
        <div className="flex items-center justify-between py-4">
          <div>
            <span className="text-white font-bold text-lg">Life</span>
            <span className="text-[#C9A84C] font-bold text-lg">Modo</span>
          </div>
          <span className="text-[#555555] text-xs glass-card px-3 py-1 rounded-full tracking-wide">ALARM</span>
        </div>

        <div className="mt-8">
          <h1 className="text-3xl font-bold text-white">Bonjour, Karim.</h1>
          <p className="text-[#888888] mt-2">Your day is prepped and ready.</p>
        </div>

        <div className="flex justify-center my-12">
          <HealthRing percentage={92} size={220} strokeWidth={16} label="Ready" />
        </div>

        <div className="grid gap-4">
          <div className="glass-card rounded-2xl p-5">
            <p className="text-[#888888] text-xs uppercase tracking-widest">Sleep Quality</p>
            <p className="text-xl font-semibold text-white mt-1">Restorative · 7h 45m</p>
          </div>
          <div className="glass-card rounded-2xl p-5">
            <p className="text-[#888888] text-xs uppercase tracking-widest">First Priority</p>
            <p className="text-xl font-semibold text-white mt-1">09:30 · Strategy Review with Daniel</p>
          </div>
        </div>

        <div className="mt-auto mb-8">
          <p className="text-[#888888] text-center text-sm italic">"Tap your coffee machine for your full briefing."</p>
        </div>
      </div>
    </main>
  )
}
