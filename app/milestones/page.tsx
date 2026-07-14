import { getMilestones } from '@/lib/cosmic'
import MilestoneCard from '@/components/MilestoneCard'

export const revalidate = 60

export default async function MilestonesPage() {
  const milestones = await getMilestones()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Milestones</h1>
        <p className="text-gray-500 mt-2">Track construction phases across all projects.</p>
      </div>
      {milestones.length === 0 ? (
        <p className="text-gray-500">No milestones found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {milestones.map((m) => (
            <MilestoneCard key={m.id} milestone={m} showProject />
          ))}
        </div>
      )}
    </div>
  )
}