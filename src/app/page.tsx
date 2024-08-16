"use client";
import { NavigationCard, Text } from "@/components/common";

export default function Home() {
  return (
    <main className="h-full flex items-center flex-col justify-center mt-10 w-full space-y-4">
      <Text as="h1" size="2xl" className="lg:text-3xl text-center" font="mono">
        Welcome to Gabe&apos;s Amazing kitchen
      </Text>
      <Text as="h2" font="mono">
        Home of the Realest Sauce
      </Text>
      <NavigationCard
        text="view openings"
        onSelect={() => console.log("test")}
      />
    </main>
  );
}
