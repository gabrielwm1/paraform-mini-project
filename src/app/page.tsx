import { NavigationCard, Text } from "@/components/common";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-full flex  mx-auto container items-center flex-col justify-center mt-10 w-full space-y-4">
      <Text as="h1" size="2xl" className="lg:text-3xl text-center" font="mono">
        Welcome to Gabe&apos;s Amazing kitchen
      </Text>
      <Text as="h2" font="mono">
        Home of the Realest Sauce
      </Text>
      <Link href="/openings" passHref className="w-full lg:w-1/4">
        <NavigationCard text="Open Roles" />
      </Link>
      <Link href="/dashboard" passHref className="w-full lg:w-1/4">
        <NavigationCard text="Dashboard" />
      </Link>
    </main>
  );
}
