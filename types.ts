export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export type ProjectStatus = string;
export type MilestoneStatus = string;
export type DefectSeverity = string;
export type DefectStatus = string;

export interface Project extends CosmicObject {
  type: 'projects';
  metadata: {
    project_name?: string;
    description?: string;
    contractor?: string;
    client?: string;
    contract_value?: number;
    location?: string;
    road_length_km?: number;
    construction_start_date?: string;
    construction_end_date?: string;
    construction_duration_months?: number;
    defects_liability_days?: number;
    defects_liability_end_date?: string;
    project_status?: string;
    project_image?: CosmicImage;
  };
}

export interface Milestone extends CosmicObject {
  type: 'milestones';
  metadata: {
    milestone_name?: string;
    description?: string;
    project?: Project | string;
    phase?: string;
    planned_date?: string;
    actual_completion_date?: string;
    progress_percent?: number;
    status?: string;
  };
}

export interface DefectReport extends CosmicObject {
  type: 'defect-reports';
  metadata: {
    defect_title?: string;
    description?: string;
    project?: Project | string;
    location_chainage?: string;
    severity?: string;
    status?: string;
    date_reported?: string;
    date_rectified?: string;
    defect_photo?: CosmicImage;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}