export type Job = {
  id: number;
  name: string;
  requisition_id: string;
  notes: string | null;
  confidential: boolean;
  is_template: boolean | null;
  copied_from_id: number | null;
  status: string;
  created_at: string; // ISO date string
  opened_at: string; // ISO date string
  closed_at: string | null; // ISO date string or null
  updated_at: string; // ISO date string;
  departments: {
    id: number;
    name: string;
    parent_id: number | null;
    parent_department_external_id: string | null;
    child_ids: number[];
    child_department_external_ids: string[];
    external_id: string | null;
  }[];
  offices: {
    id: number;
    name: string;
    location: {
      name: string | null;
    };
    primary_contact_user_id: number | null;
    parent_id: number | null;
    parent_office_external_id: string | null;
    child_ids: number[];
    child_office_external_ids: string[];
    external_id: string | null;
  }[];
  hiring_team: {
    hiring_managers: unknown[]; // You can replace 'unknown' with a specific type if available
    recruiters: unknown[];
    coordinators: unknown[];
    sourcers: unknown[];
  };
  openings: {
    id: number;
    opening_id: string | null;
    status: string;
    opened_at: string; // ISO date string
    closed_at: string | null; // ISO date string or null
    application_id: number | null;
    close_reason: {
      id: number;
      name: string;
    } | null;
  }[];
  custom_fields: {
    employment_type: string;
    salary_range: {
      min_value: string;
      max_value: string;
      unit: string;
    };
  };
  keyed_custom_fields: {
    employment_type: {
      name: string;
      type: string;
      value: string;
    };
    salary_range: {
      name: string;
      type: string;
      value: {
        min_value: string;
        max_value: string;
        unit: string;
      };
    };
  };
};
