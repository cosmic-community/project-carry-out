interface ProgressBarProps {
  percent?: number
}

export default function ProgressBar({ percent }: ProgressBarProps) {
  const value = Math.max(0, Math.min(100, percent ?? 0))
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>Progress</span>
        <span className="font-semibold text-gray-700">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-brand-600 h-2.5 rounded-full transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}