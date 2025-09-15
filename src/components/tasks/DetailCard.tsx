import type { Dispatch, SetStateAction } from "react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/components/ui/card.tsx";
import { X } from "lucide-react";
import type { Task } from "@/types/task.types.ts";

export default function DetailCard({
  setOpenedTaskId,
  task,
}: {
  setOpenedTaskId: Dispatch<SetStateAction<number | undefined>>;
  task: Task;
}) {
  return (
    <Card>
      <X onClick={() => setOpenedTaskId(undefined)} size={16} />
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{task.description}</p>
      </CardContent>
    </Card>
  );
}
