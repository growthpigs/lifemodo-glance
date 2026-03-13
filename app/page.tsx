import Link from 'next/link'

export default function Home() {
  const circles = [
    { href: '/c/fob-a', icon: '⚡', label: 'Fob A — Capture', desc: 'Health snapshot & quick actions' },
    { href: '/c/fob-b', icon: '🏠', label: 'Fob B — Dashboard', desc: 'Household presence & vitals' },
    { href: '/c/wine', icon: '🍷', label: 'Wine Circle', desc: 'Glass count & sleep correlation' },
    { href: '/c/weights', icon: '🏋️', label: 'Weights Circle', desc: 'Pre/post workout tracker' },
    { href: '/c/story', icon: '🎙️', label: 'Story Circle', desc: 'Audio memories & recording' },
  ]

  return (
    <main className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6">
      <div className="circles-bg" />
      <div className="relative z-10 w-full max-w-sm">
        {/* Wordmark */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-white">Life</span>
            <span className="text-[#C9A84C]">Modo</span>
          </h1>
          <p className="text-[#888888] text-sm mt-1">Glance Demo · NFC Circles</p>
        </div>

        {/* Circle links */}
        <div className="flex flex-col gap-3">
          {circles.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="glass-card rounded-2xl p-4 flex items-center gap-4 hover:border-[#C9A84C]/40 transition-all duration-200 active:scale-[0.98]"
            >
              <span className="text-3xl">{c.icon}</span>
              <div>
                <p className="font-semibold text-white text-sm">{c.label}</p>
                <p className="text-[#888888] text-xs mt-0.5">{c.desc}</p>
              </div>
              <span className="ml-auto text-[#888888]">›</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
