//this page displays the job information

import { ApplicationForm } from "@/components/candidates";
import { Text } from "@/components/common";
import { JobDetails } from "@/components/jobs/JobDetails";
import { getJobPostById } from "@/handlers/getJobPostById";
import { Job } from "@/types/jobs";
import { usePathname, useRouter } from "next/navigation";

// this page retrieves the job by id and renders the application form
export default async function JobPage({
  params: { jobId },
}: {
  params: { jobId: string };
}) {
  const data: Job = await getJobPostById(jobId);
  console.log(data);
  return <JobDetails job={data} />;
}
