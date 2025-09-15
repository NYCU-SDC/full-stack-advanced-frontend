import { TableHead, TableRow, TableCell } from "@/components/ui/table.tsx";
import { type Task } from "@/types/task.types.ts";
import Label from "@/components/tasks/Label.tsx";
import Status from "@/components/tasks/Status.tsx";
import { useEffect, useState } from "react";

export function TableHeadRow() {
  return (
    <TableRow>
      <TableHead className="hidden sm:table-cell">ID</TableHead>
      <TableHead className="hidden sm:table-cell">Labels</TableHead>
      <TableHead>Title</TableHead>
      <TableHead className="hidden sm:table-cell">Status</TableHead>
      <TableHead className="table-cell sm:hidden"></TableHead>
      <TableHead>Due</TableHead>
      <TableHead>Assignee</TableHead>
    </TableRow>
  );
}

export function TableBodyRow({
  task,
  onClick,
}: {
  task: Task;
  onClick?: () => void;
}) {
  const [dueInDays, setDueInDays] = useState<number | null>(null);

  useEffect(() => {
    if (!task.dueDate) return;
    const dueDate = new Date(task.dueDate);
    const now = new Date();
    const diffTime = dueDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    setDueInDays(diffDays);
  }, [task.dueDate]);

  return (
    <TableRow onClick={onClick}>
      <TableCell className="hidden sm:table-cell">{task.id}</TableCell>
      <TableCell className="hidden sm:table-cell">
        <div className="space-x-1">
          {task.labels.map((label) => (
            <Label key={label} label={label} />
          ))}
        </div>
      </TableCell>
      <TableCell>{task.title}</TableCell>
      <TableCell className="hidden sm:table-cell">
        <Status status={task.status} />
      </TableCell>
      <TableCell className="table-cell sm:hidden">
        <Status status={task.status} dot={true} />
      </TableCell>
      <TableCell>{dueInDays ? `in ${dueInDays} days` : "N/A"}</TableCell>
      <TableCell>{task.assignee ?? "Unassigned"}</TableCell>
    </TableRow>
  );
}
