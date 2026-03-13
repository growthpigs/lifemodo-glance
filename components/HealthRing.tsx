'use client'

interface HealthRingProps {
  percentage: number
  size?: number
  strokeWidth?: number
  label?: string
}

export default function HealthRing({
  percentage,
  size = 180,
  strokeWidth = 12,
  label = 'Ready',
}: HealthRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const clampedPct = Math.min(100, Math.max(0, percentage))
  // Start from top (−90°), go clockwise
  const dashOffset = circumference * (1 - clampedPct / 100)

  // Colour: green ≥80, amber 60–79, red <60
  const arcColor =
    clampedPct >= 80 ? '#4ADE80' : clampedPct >= 60 ? '#C9A84C' : '#F87171'

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1A1A1A"
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={arcColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.8s ease, stroke 0.4s ease' }}
        />
      </svg>
      {/* Centre label */}
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-white leading-none">{clampedPct}%</span>
        <span className="text-sm mt-1" style={{ color: arcColor }}>{label}</span>
      </div>
    </div>
  )
}
