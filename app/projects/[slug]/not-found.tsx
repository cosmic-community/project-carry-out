// app/projects/[slug]/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <span className="text-6xl">🛣️</span>
      <h1 className="text-2xl font-bold text-gray-900 mt-4">Project not found</h1>
      <p className="text-gray-500 mt-2">The project you are looking for does not exist.</p>
      <Link
        href="/projects"
        className="inline-block mt-6 bg-brand-600 hover:bg-brand-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
      >
        Back to Projects
      </Link>
    </div>
  )
}