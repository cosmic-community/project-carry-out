export function formatCurrency(value?: number): string {
  if (value === undefined || value === null) return '—'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatDate(dateStr?: string): string {
  if (!dateStr) return '—'
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return '—'
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function statusColor(status: string): string {
  const s = status.toLowerCase()
  if (s.includes('complete') || s.includes('rectified') || s.includes('closed')) {
    return 'bg-green-100 text-green-800'
  }
  if (s.includes('progress') || s.includes('ongoing') || s.includes('open')) {
    return 'bg-blue-100 text-blue-800'
  }
  if (s.includes('pending') || s.includes('planned') || s.includes('reported')) {
    return 'bg-amber-100 text-amber-800'
  }
  if (s.includes('delay') || s.includes('overdue') || s.includes('critical')) {
    return 'bg-red-100 text-red-800'
  }
  return 'bg-gray-100 text-gray-800'
}

export function severityColor(severity: string): string {
  const s = severity.toLowerCase()
  if (s.includes('critical') || s.includes('high')) return 'bg-red-100 text-red-800'
  if (s.includes('medium') || s.includes('moderate')) return 'bg-amber-100 text-amber-800'
  if (s.includes('low') || s.includes('minor')) return 'bg-green-100 text-green-800'
  return 'bg-gray-100 text-gray-800'
}