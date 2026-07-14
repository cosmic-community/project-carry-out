import { getDefectReports } from '@/lib/cosmic'
import DefectCard from '@/components/DefectCard'

export const revalidate = 60

export default async function DefectsPage() {
  const defects = await getDefectReports()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Defect Reports</h1>
        <p className="text-gray-500 mt-2">
          Defects raised during the 180-day defects liability period.
        </p>
      </div>
      {defects.length === 0 ? (
        <p className="text-gray-500">No defect reports found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {defects.map((d) => (
            <DefectCard key={d.id} defect={d} showProject />
          ))}
        </div>
      )}
    </div>
  )
}