import { Text } from "./Text";

export function RoleCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex p-4 rounded-lg bg-muted cursor-pointer flex-col space-y-2 transition-opacity duration-300 hover:opacity-80">
      <div className="flex items-center space-x-2 ">
        <Text className="text-foreground capitalize">{children}</Text>
      </div>
    </div>
  );
}
