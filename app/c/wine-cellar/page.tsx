'use client'

import { useState } from 'react'

export default function WineCellarPage() {
  const [mode, setMode] = useState<'owner' | 'guest'>('owner')

  return (
    <main className="min-h-screen bg-[#0A0A0A] flex flex-col">
      <div className="circles-bg" />
      <div className="relative z-10 flex flex-col min-h-screen safe-top safe-bottom px-3">
        <div className="flex items-center justify-between py-4">
          <div>
            <span className="text-white font-bold text-lg">Life</span>
            <span className="text-[#C9A84C] font-bold text-lg">Modo</span>
          </div>
          <div className="flex bg-[#111111] p-1 rounded-full border border-[#1A1A1A]">
             <button 
                onClick={() => setMode('owner')}
                className={`px-3 py-1 text-[10px] rounded-full transition-all ${mode === 'owner' ? 'bg-[#C9A84C] text-black font-bold' : 'text-[#888888]'}`}
             >OWNER</button>
             <button 
                onClick={() => setMode('guest')}
                className={`px-3 py-1 text-[10px] rounded-full transition-all ${mode === 'guest' ? 'bg-[#C9A84C] text-black font-bold' : 'text-[#888888]'}`}
             >GUEST</button>
          </div>
        </div>

        <div className="mt-4 mb-6">
          <h1 className="text-2xl font-semibold text-white">Wine Cellar</h1>
          <p className="text-[#888888] text-sm">{mode === 'owner' ? 'Management Interface' : 'Visitor Information'}</p>
        </div>

        {mode === 'owner' ? (
          <div className="space-y-4">
            <div className="glass-card rounded-2xl p-5">
               <p className="text-[#C9A84C] font-bold text-lg">1,242 Bottles</p>
               <p className="text-[#888888] text-xs">Valuation: €184,500</p>
            </div>
            <div className="glass-card rounded-2xl p-5">
               <p className="text-white font-semibold">Tonight's Pairing</p>
               <p className="text-[#888888] text-sm mt-1">2015 Château Margaux</p>
               <p className="text-[#888888] text-xs mt-0.5">Bin 42 · Optimal drinking window</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="glass-card rounded-2xl p-5">
               <p className="text-white font-semibold text-lg">Welcome to the Cellar</p>
               <p className="text-[#888888] text-sm mt-2 leading-relaxed">
                  Jean-Marc has curated this collection over 20 years. Feel free to browse the physical bins.
               </p>
            </div>
            <div className="glass-card rounded-2xl p-5">
               <p className="text-[#C9A84C] font-semibold">The 2015 Margaux Story</p>
               <p className="text-white text-sm mt-2 italic">"We bought this case the day we landed in Bordeaux for the first time..."</p>
               <p className="text-[#888888] text-[10px] mt-2">Tap to play audio memory</p>
            </div>
          </div>
        )}

        <div className="mt-auto mb-8">
           <div className="w-full h-[1px] bg-[#1A1A1A] mb-4"></div>
           <p className="text-[#888888] text-center text-[10px] uppercase tracking-widest">
              {mode === 'owner' ? 'Secure Admin Link' : 'Guest Mode Active'}
           </p>
        </div>
      </div>
    </main>
  )
}
