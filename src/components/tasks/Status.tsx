import { Badge } from "@/components/ui/badge.tsx";

export default function Status({
  status,
  dot = false,
}: {
  status: string;
  dot?: boolean;
}) {
  const statusColors: { [key: string]: string } = {
    INBOX: "bg-slate-300 text-black",
    TO_DO: "bg-slate-300 text-black",
    IN_PROGRESS: "bg-blue-200 text-blue-600",
    DONE: "bg-green-200 text-green-600",
  };

  const colorClass = statusColors[status] || "bg-slate-300 text-black";

  return dot ? (
    <span className={colorClass + " text-[8px] bg-transparent"}>&#9679;</span>
  ) : (
    <Badge className={colorClass}>{status.replace("_", " ")}</Badge>
  );
}
