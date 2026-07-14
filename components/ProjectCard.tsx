import Link from 'next/link'
import { Project } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { formatCurrency } from '@/lib/utils'
import StatusBadge from '@/components/StatusBadge'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const image = project.metadata?.project_image
  const name = getMetafieldValue(project.metadata?.project_name) || project.title
  const location = getMetafieldValue(project.metadata?.location)
  const roadLength = project.metadata?.road_length_km
  const contractValue = project.metadata?.contract_value
  const duration = project.metadata?.construction_duration_months
  const liabilityDays = project.metadata?.defects_liability_days

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-100 overflow-hidden transition-all"
    >
      {image ? (
        <div className="h-48 overflow-hidden">
          <img
            src={`${image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
            alt={name}
            width={400}
            height={200}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-asphalt-800 to-asphalt-950 flex items-center justify-center">
          <span className="text-5xl">🛣️</span>
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-brand-600 transition-colors">
            {name}
          </h3>
          <StatusBadge status={project.metadata?.project_status} />
        </div>
        {location && (
          <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
            📍 {location}
          </p>
        )}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wide">Contract</p>
            <p className="font-semibold text-gray-900">{formatCurrency(contractValue)}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wide">Road Length</p>
            <p className="font-semibold text-gray-900">{roadLength ? `${roadLength} km` : '—'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wide">Duration</p>
            <p className="font-semibold text-gray-900">{duration ? `${duration} mo` : '—'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wide">Liability</p>
            <p className="font-semibold text-gray-900">{liabilityDays ? `${liabilityDays} days` : '—'}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}