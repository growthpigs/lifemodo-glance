'use client'

import ActionCard from '@/components/ActionCard'

export default function WardrobePage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] flex flex-col">
      <div className="circles-bg" />
      <div className="relative z-10 flex flex-col min-h-screen safe-top safe-bottom px-5">
        <div className="flex items-center justify-between py-4">
          <div>
            <span className="text-white font-bold text-lg">Life</span>
            <span className="text-[#C9A84C] font-bold text-lg">Modo</span>
          </div>
          <span className="text-[#555555] text-xs glass-card px-3 py-1 rounded-full tracking-wide">WARDROBE</span>
        </div>

        <div className="mt-4 mb-6">
          <h1 className="text-2xl font-semibold text-white">ProperDress</h1>
          <p className="text-[#888888] text-sm">Scanned: Navy Silk Blazer</p>
        </div>

        {/* Main Outfit Preview Placeholder */}
        <div className="glass-card rounded-2xl aspect-[3/4] overflow-hidden mb-6 flex flex-col">
           <div className="flex-1 bg-[#111111] flex items-center justify-center">
              <span className="text-[#C9A84C] text-sm italic">[AI Rendering Outfit...]</span>
           </div>
           <div className="p-4 bg-black/40 backdrop-blur-md">
              <p className="text-white font-medium text-sm">The "Executive Casual" Look</p>
              <p className="text-[#888888] text-xs">Perfect for today's 18°C weather and Daniel's meeting.</p>
           </div>
        </div>

        <p className="text-[#888888] text-xs uppercase tracking-widest mb-3">Recommended Pairings</p>
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="glass-card rounded-xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1A1A1A] rounded-lg"></div>
            <div>
              <p className="text-white text-xs font-medium">Grey Flannels</p>
              <p className="text-[#888888] text-[10px]">Shelf 2A</p>
            </div>
          </div>
          <div className="glass-card rounded-xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1A1A1A] rounded-lg"></div>
            <div>
              <p className="text-white text-xs font-medium">White Poplin</p>
              <p className="text-[#888888] text-[10px]">Drawer 1</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
