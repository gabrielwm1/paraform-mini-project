"use client";
import { Job } from "@/types/jobs";
import { ApplicationForm } from "../candidates";
import { Text } from "../common";
import { formatCurrency } from "@/lib/utils";

interface JobDetailProps {
  job: Job;
}
export function JobDetails({ job }: JobDetailProps) {
  console.log(job);
  return (
    <div className="my-10 space-y-8 ">
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
          <Text>Range</Text>
          <Text>
            {formatCurrency(job.custom_fields.salary_range.min_value)} -{" "}
            {formatCurrency(job.custom_fields.salary_range.max_value)}
          </Text>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <Text size="xl" weight="bold">
          About this Role
        </Text>
        <Text size="base" weight="light">
          We are looking for the next innovator to join our team at Gabe&apos;s
          Amazing Kitchen
        </Text>
      </div>

      <div className="flex flex-col space-y-2">
        <Text size="xl" weight="bold">
          What we look for
        </Text>
        <Text weight="light">
          We are cultivating the thing that no one can touch.
        </Text>
        <Text weight="light">
          {`It's those
            aha moments that make life worth living, that someone says "I finally get
            it. It's just so simple, so great, it's so real."`}
        </Text>
        <Text weight="light">
          We are looking for somone who will execute and create this experience
          for our customers end to end.{" "}
        </Text>
        <Text weight="light">
          Ideal candidates are self driven, self motivated, lead with a great
          deal of empathy, a collaborative spirit, and simply love what they do.{" "}
        </Text>
      </div>
      <div className="flex flex-col space-y-2">
        <Text size="xl" weight="bold">
          Roles and Responsibiliies
        </Text>
        <Text size="base" weight="light">
          • Make the sauce
        </Text>
        <Text size="base" weight="light">
          • Sell the sauce
        </Text>
        <Text size="base" weight="light">
          • Improve the sauce{""}
        </Text>
      </div>
      <div className="flex space-y-4 flex-col ">
        <Text size="xl" weight="bold">
          Apply for this role
        </Text>
      </div>
      <div className="max-w-lg">
        <ApplicationForm
          job_id={String(job.id)}
          onSuccess={() => console.log("test")}
          onClose={() => console.log("test")}
        />
      </div>
    </div>
  );
}
