import { severityColor } from '@/lib/utils'
import { getMetafieldValue } from '@/lib/cosmic'

interface SeverityBadgeProps {
  severity: unknown
}

export default function SeverityBadge({ severity }: SeverityBadgeProps) {
  const label = getMetafieldValue(severity)
  if (!label) return null
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${severityColor(label)}`}>
      {label}
    </span>
  )
}