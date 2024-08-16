//this page displays the job information

import { JobCard } from "@/components/jobs/JobCard";
import { JobDetails } from "@/components/jobs/JobDetails";
import { getJobById } from "@/handlers/getJobById";
import { getJobPostById } from "@/handlers/getJobPostById";
import { JobPost } from "@/types/jobPost";
import { Job } from "@/types/jobs";

export default async function JobPage({
  params: { jobId },
}: {
  params: { jobId: string };
}) {
  // we fetch both job and job post so we can get salary info
  //   job post to job is 1:many, but assume 1:1 for now
  const jobPosts: JobPost[] = await getJobPostById(jobId);

  const job: Job = await getJobById(jobId);

  return (
    <div className="my-10 space-y-8 ">
      <JobCard job={job} />
      <JobDetails jobPost={jobPosts[0]} />
    </div>
  );
}
