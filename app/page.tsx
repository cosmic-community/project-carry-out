import Link from 'next/link'
import { getProjects, getMilestones, getDefectReports } from '@/lib/cosmic'
import ProjectCard from '@/components/ProjectCard'

export const revalidate = 60

export default async function HomePage() {
  const [projects, milestones, defects] = await Promise.all([
    getProjects(),
    getMilestones(),
    getDefectReports(),
  ])

  const openDefects = defects.filter((d) => {
    const status = (d.metadata?.status || '').toString().toLowerCase()
    return !status.includes('rectified') && !status.includes('closed')
  }).length

  return (
    <div>
      {/* Hero */}
      <section className="bg-asphalt-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-3xl">
            <span className="inline-block bg-brand-600/20 text-brand-200 text-sm font-medium px-3 py-1 rounded-full mb-4">
              Road Rehabilitation Management
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Carry out your projects with confidence
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Track construction across the 12-month build period and manage defects through the
              180-day defects liability window — all in one place.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="bg-brand-600 hover:bg-brand-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                View Projects
              </Link>
              <Link
                href="/defects"
                className="bg-asphalt-800 hover:bg-asphalt-950 text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Defect Reports
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <p className="text-3xl font-extrabold text-brand-600">{projects.length}</p>
            <p className="text-gray-500 mt-1">Active Projects</p>
          </div>
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <p className="text-3xl font-extrabold text-brand-600">{milestones.length}</p>
            <p className="text-gray-500 mt-1">Milestones Tracked</p>
          </div>
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <p className="text-3xl font-extrabold text-red-600">{openDefects}</p>
            <p className="text-gray-500 mt-1">Open Defects</p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Recent Projects</h2>
          <Link href="/projects" className="text-brand-600 hover:text-brand-700 font-medium text-sm">
            View all →
          </Link>
        </div>
        {projects.length === 0 ? (
          <p className="text-gray-500">No projects found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 6).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}