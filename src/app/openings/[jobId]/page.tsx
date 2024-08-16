"use client";
//this page displays the job information

import { ApplicationForm } from "@/components/candidates";
import { Text } from "@/components/common";
import { usePathname, useRouter } from "next/navigation";

// this page retrieves the job by id and renders the application form
export default function JobPage({
  params: { jobId },
}: {
  params: { jobId: string };
}) {
  return (
    <div className="my-10 space-y-8 ">
      <div className="bg-muted p-4 rounded-lg flex flex-col space-y-2">
        <Text size="xl" font="mono">
          Founding Engineer
        </Text>
        <div className="flex space-x-2">
          <Text>Full Time</Text>
          <Text>•</Text>
          <Text>San Francisco</Text>
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
        <div className="max-w-lg">
          <ApplicationForm
            job_id={jobId}
            onSuccess={() => console.log("test")}
            onClose={() => console.log("test")}
          />
        </div>
      </div>
    </div>
  );
}
