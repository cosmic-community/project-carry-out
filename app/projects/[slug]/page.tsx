// app/projects/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getProjectBySlug,
  getMilestonesByProject,
  getDefectReportsByProject,
  getMetafieldValue,
} from '@/lib/cosmic'
import { formatCurrency, formatDate } from '@/lib/utils'
import StatusBadge from '@/components/StatusBadge'
import MilestoneCard from '@/components/MilestoneCard'
import DefectCard from '@/components/DefectCard'

export const revalidate = 60

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const [milestones, defects] = await Promise.all([
    getMilestonesByProject(project.id),
    getDefectReportsByProject(project.id),
  ])

  const name = getMetafieldValue(project.metadata?.project_name) || project.title
  const description = getMetafieldValue(project.metadata?.description)
  const contractor = getMetafieldValue(project.metadata?.contractor)
  const client = getMetafieldValue(project.metadata?.client)
  const location = getMetafieldValue(project.metadata?.location)
  const image = project.metadata?.project_image

  const details: { label: string; value: string }[] = [
    { label: 'Contractor', value: contractor || '—' },
    { label: 'Client', value: client || '—' },
    { label: 'Location', value: location || '—' },
    { label: 'Contract Value', value: formatCurrency(project.metadata?.contract_value) },
    {
      label: 'Road Length',
      value: project.metadata?.road_length_km ? `${project.metadata.road_length_km} km` : '—',
    },
    {
      label: 'Construction Start',
      value: formatDate(project.metadata?.construction_start_date),
    },
    {
      label: 'Construction End',
      value: formatDate(project.metadata?.construction_end_date),
    },
    {
      label: 'Duration',
      value: project.metadata?.construction_duration_months
        ? `${project.metadata.construction_duration_months} months`
        : '—',
    },
    {
      label: 'Defects Liability',
      value: project.metadata?.defects_liability_days
        ? `${project.metadata.defects_liability_days} days`
        : '—',
    },
    {
      label: 'Liability End Date',
      value: formatDate(project.metadata?.defects_liability_end_date),
    },
  ]

  return (
    <div>
      {/* Hero */}
      <div className="relative bg-asphalt-900 text-white">
        {image && (
          <div className="absolute inset-0 opacity-30">
            <img
              src={`${image.imgix_url}?w=2000&h=600&fit=crop&auto=format,compress`}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link href="/projects" className="text-brand-200 hover:text-white text-sm mb-4 inline-block">
            ← Back to projects
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold">{name}</h1>
            <StatusBadge status={project.metadata?.project_status} />
          </div>
          {location && <p className="text-gray-300">📍 {location}</p>}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Overview */}
        {description && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Overview</h2>
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </section>
        )}

        {/* Details */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Project Details</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-y divide-gray-100">
            {details.map((d) => (
              <div key={d.label} className="p-4">
                <p className="text-xs text-gray-400 uppercase tracking-wide">{d.label}</p>
                <p className="font-semibold text-gray-900 mt-1">{d.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Milestones */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Milestones <span className="text-gray-400 font-normal">({milestones.length})</span>
          </h2>
          {milestones.length === 0 ? (
            <p className="text-gray-500">No milestones for this project.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {milestones.map((m) => (
                <MilestoneCard key={m.id} milestone={m} />
              ))}
            </div>
          )}
        </section>

        {/* Defects */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Defect Reports <span className="text-gray-400 font-normal">({defects.length})</span>
          </h2>
          {defects.length === 0 ? (
            <p className="text-gray-500">No defect reports for this project.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {defects.map((d) => (
                <DefectCard key={d.id} defect={d} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}