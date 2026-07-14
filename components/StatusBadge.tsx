import { statusColor } from '@/lib/utils'
import { getMetafieldValue } from '@/lib/cosmic'

interface StatusBadgeProps {
  status: unknown
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const label = getMetafieldValue(status)
  if (!label) return null
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor(label)}`}>
      {label}
    </span>
  )
}