import { Button, Text } from "@/components/common";
import { RoleCard } from "@/components/common/RoleCard";
import Link from "next/link";

export default async function Page() {
  // todo: fetch job postings from api
  //   for now just rendering one hardcoded role, with a hardcoded id
  //harvest.greenhouse.io/v1/job_posts
  https: return (
    <main className="h-full flex items-center flex-col justify-center mt-10 w-full space-y-4">
      <Text size="2xl" font="mono">
        Open Roles
      </Text>
      <Link
        href={{
          pathname: "/openings/45554",
        }}
      >
        <RoleCard>Founding Engineer</RoleCard>
      </Link>
    </main>
  );
}
