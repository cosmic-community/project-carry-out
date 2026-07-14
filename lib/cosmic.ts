import { createBucketClient } from '@cosmicjs/sdk'
import { Project, Milestone, DefectReport, hasStatus } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Safe helper to render any metafield value in JSX
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'number' || typeof field === 'boolean') return String(field);
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value);
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key);
  }
  return '';
}

export async function getProjects(): Promise<Project[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'projects' })
      .props(['id', 'title', 'slug', 'metadata', 'type', 'created_at', 'modified_at'])
      .depth(1)
    return response.objects as Project[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch projects')
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'projects', slug })
      .depth(1)
    return (response.object as Project) || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch project')
  }
}

export async function getMilestones(): Promise<Milestone[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'milestones' })
      .props(['id', 'title', 'slug', 'metadata', 'type', 'created_at', 'modified_at'])
      .depth(1)
    return response.objects as Milestone[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch milestones')
  }
}

export async function getMilestonesByProject(projectId: string): Promise<Milestone[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'milestones', 'metadata.project': projectId })
      .depth(1)
    return response.objects as Milestone[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch milestones for project')
  }
}

export async function getDefectReports(): Promise<DefectReport[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'defect-reports' })
      .props(['id', 'title', 'slug', 'metadata', 'type', 'created_at', 'modified_at'])
      .depth(1)
    return response.objects as DefectReport[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch defect reports')
  }
}

export async function getDefectReportsByProject(projectId: string): Promise<DefectReport[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'defect-reports', 'metadata.project': projectId })
      .depth(1)
    return response.objects as DefectReport[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch defect reports for project')
  }
}