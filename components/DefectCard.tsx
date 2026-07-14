import { DefectReport } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { formatDate } from '@/lib/utils'
import StatusBadge from '@/components/StatusBadge'
import SeverityBadge from '@/components/SeverityBadge'

interface DefectCardProps {
  defect: DefectReport
  showProject?: boolean
}

export default function DefectCard({ defect, showProject = false }: DefectCardProps) {
  const title = getMetafieldValue(defect.metadata?.defect_title) || defect.title
  const description = getMetafieldValue(defect.metadata?.description)
  const chainage = getMetafieldValue(defect.metadata?.location_chainage)
  const reported = defect.metadata?.date_reported
  const rectified = defect.metadata?.date_rectified
  const photo = defect.metadata?.defect_photo

  const project = defect.metadata?.project
  const projectName =
    typeof project === 'object' && project !== null
      ? getMetafieldValue(project.metadata?.project_name) || project.title
      : ''

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
      {photo && (
        <div className="h-40 overflow-hidden">
          <img
            src={`${photo.imgix_url}?w=800&h=320&fit=crop&auto=format,compress`}
            alt={title}
            width={400}
            height={160}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-gray-900">{title}</h3>
          <div className="flex flex-col items-end gap-1">
            <SeverityBadge severity={defect.metadata?.severity} />
            <StatusBadge status={defect.metadata?.status} />
          </div>
        </div>

        {showProject && projectName && (
          <p className="text-sm text-gray-500 mb-2">🛣️ {projectName}</p>
        )}

        {chainage && <p className="text-xs text-gray-500 mb-2">📍 Chainage: {chainage}</p>}

        {description && <p className="text-sm text-gray-600 mb-4 flex-1">{description}</p>}

        <div className="grid grid-cols-2 gap-3 text-sm border-t border-gray-100 pt-3 mt-auto">
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wide">Reported</p>
            <p className="font-medium text-gray-900">{formatDate(reported)}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wide">Rectified</p>
            <p className="font-medium text-gray-900">{formatDate(rectified)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}