'use client'

import React from 'react'

interface ActionCardProps {
  icon: string
  label: string
  href?: string
  onClick?: () => void
  variant?: 'default' | 'gold' | 'green' | 'red'
}

const variantStyles: Record<string, string> = {
  default: 'bg-[#111111] border-[#1A1A1A] text-white hover:border-[#C9A84C]',
  gold: 'bg-[#C9A84C]/10 border-[#C9A84C]/40 text-[#C9A84C] hover:bg-[#C9A84C]/20',
  green: 'bg-green-500/10 border-green-500/40 text-green-400 hover:bg-green-500/20',
  red: 'bg-red-500/10 border-red-500/40 text-red-400 hover:bg-red-500/20',
}

export default function ActionCard({ icon, label, href, onClick, variant = 'default' }: ActionCardProps) {
  const classes = `
    flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border
    transition-all duration-200 active:scale-95 cursor-pointer select-none
    ${variantStyles[variant]}
  `

  const content = (
    <>
      <span className="text-2xl">{icon}</span>
      <span className="text-xs font-medium text-center leading-tight">{label}</span>
    </>
  )

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={classes}>
      {content}
    </button>
  )
}
