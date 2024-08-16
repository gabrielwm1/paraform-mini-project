// this dashboard page  is ideally available for employees after login

import { NavigationCard, Text } from "@/components/common";
import Link from "next/link";

export function Page() {
  return (
    <div>
      <Text>Welcome to the Employee Dashboard</Text>
      <Link href="/dashboard/applications" passHref>
        <NavigationCard text="View Applications" />
      </Link>
    </div>
  );
}
