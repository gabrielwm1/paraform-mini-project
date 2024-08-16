import { ArrowRightIcon } from "../icons";
import { Text } from "./Text";

export function NavigationCard({
  onSelect,
  text,
}: {
  onSelect: () => void;
  text: string;
}) {
  return (
    <div
      className="flex p-4 rounded-lg bg-muted cursor-pointer flex-col space-y-2 transition-opacity duration-300 hover:opacity-80"
      onClick={() => onSelect()}
    >
      <div className="flex items-center space-x-2">
        <ArrowRightIcon className="text-foreground" />
        <Text className="text-foreground capitalize">{text}</Text>
      </div>
    </div>
  );
}
