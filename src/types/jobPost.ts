export type JobPost = {
  id: number;
  active: boolean;
  live: boolean;
  first_published_at: string; // ISO date string
  title: string;
  location: {
    id: number;
    name: string;
    office_id: number | null;
    job_post_custom_location_id: number | null;
    job_post_location_type: {
      id: number;
      name: string;
    };
  };
  internal: boolean;
  external: boolean;
  job_id: number;
  content: string;
  internal_content: string | null;
  updated_at: string; // ISO date string
  created_at: string; // ISO date string
  demographic_question_set_id: number | null;
  questions: Array<{
    required: boolean;
    private: boolean;
    label: string;
    name: string;
    type: "short_text" | "attachment"; // Adjust as necessary if more types exist
    values: Array<any>; // Adjust type based on actual values
    description: string | null;
  }>;
};
