import { getProjects } from '@/lib/cosmic'
import ProjectCard from '@/components/ProjectCard'

export const revalidate = 60

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Projects</h1>
        <p className="text-gray-500 mt-2">All road rehabilitation projects.</p>
      </div>
      {projects.length === 0 ? (
        <p className="text-gray-500">No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}