import { Job } from "@/types/jobs";
import { Text } from "../common";
import { formatCurrency } from "@/lib/utils";

interface JobCardProps {
  job: Job;
}
export function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-muted p-4 rounded-lg flex flex-col space-y-2">
      <Text size="xl" font="mono">
        {job.name}
      </Text>
      <div className="flex space-x-2">
        <Text>Full Time</Text>
        <Text>•</Text>
        <Text>{job.offices[0].name}</Text>
      </div>
      <div>
        <Text className="text-muted-foreground">
          {formatCurrency(job.custom_fields.salary_range.min_value)} -{" "}
          {formatCurrency(job.custom_fields.salary_range.max_value)}
        </Text>
      </div>
    </div>
  );
}
