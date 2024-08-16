import { Button, Text } from "@/components/common";
import { RoleCard } from "@/components/common/RoleCard";
import { fetchJobPosts } from "@/handlers/listJobPosts";
import { Job } from "@/types/jobs";
import Link from "next/link";

export default async function Page() {
  const data: Job[] = await fetchJobPosts();

  if (data) {
    return (
      <main className="h-full flex mx-auto max-w-sm items-center flex-col justify-center mt-10 w-full space-y-4">
        <Text size="2xl" font="mono">
          Open Roles
        </Text>
        {data?.map((job) => {
          return (
            <Link
              className="w-full"
              key={job.id}
              href={{
                pathname: `/openings/${job.id}`,
              }}
            >
              <RoleCard>{job.name}</RoleCard>
            </Link>
          );
        })}
      </main>
    );
  }
}
