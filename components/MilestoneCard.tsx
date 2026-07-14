import { Milestone } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { formatDate } from '@/lib/utils'
import StatusBadge from '@/components/StatusBadge'
import ProgressBar from '@/components/ProgressBar'

interface MilestoneCardProps {
  milestone: Milestone
  showProject?: boolean
}

export default function MilestoneCard({ milestone, showProject = false }: MilestoneCardProps) {
  const name = getMetafieldValue(milestone.metadata?.milestone_name) || milestone.title
  const phase = getMetafieldValue(milestone.metadata?.phase)
  const description = getMetafieldValue(milestone.metadata?.description)
  const planned = milestone.metadata?.planned_date
  const actual = milestone.metadata?.actual_completion_date
  const progress = milestone.metadata?.progress_percent

  const project = milestone.metadata?.project
  const projectName =
    typeof project === 'object' && project !== null
      ? getMetafieldValue(project.metadata?.project_name) || project.title
      : ''

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <h3 className="font-bold text-gray-900">{name}</h3>
          {phase && <p className="text-xs text-brand-600 font-medium uppercase tracking-wide mt-0.5">{phase}</p>}
        </div>
        <StatusBadge status={milestone.metadata?.status} />
      </div>

      {showProject && projectName && (
        <p className="text-sm text-gray-500 mb-3">🛣️ {projectName}</p>
      )}

      {description && <p className="text-sm text-gray-600 mb-4">{description}</p>}

      <div className="mb-4">
        <ProgressBar percent={progress} />
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm border-t border-gray-100 pt-3">
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-wide">Planned</p>
          <p className="font-medium text-gray-900">{formatDate(planned)}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-wide">Completed</p>
          <p className="font-medium text-gray-900">{formatDate(actual)}</p>
        </div>
      </div>
    </div>
  )
}