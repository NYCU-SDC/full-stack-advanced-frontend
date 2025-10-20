import { type Dispatch, type SetStateAction, useState } from "react";
import {
  Card,
  CardTitle,
  CardContent,
  CardHeader,
} from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X, CalendarClock } from "lucide-react";
import { UserCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import type { Task } from "@/types/task.types.ts";
import Status from "@/components/tasks/Status.tsx";
import Label from "@/components/tasks/Label.tsx";

export default function DetailCard({
  setOpenedTaskId,
  task,
}: {
  setOpenedTaskId: Dispatch<SetStateAction<number | undefined>>;
  task: Task;
}) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const dateFormatter = new Intl.DateTimeFormat(navigator.language, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  // e.g. "Monday, September 22, 2025"

  // const twFormatter = new Intl.DateTimeFormat("zh-TW", {
  //   month: "short",
  //   day: "numeric",
  //   year: "numeric",
  // });
  // // e.g. "2025年9月22日 星期一"

  return (
    <Card className="w-md">
      <CardHeader>
        <div className="flex justify-between">
          <p className="text-sm text-muted-foreground">#{task.id}</p>
          <X
            className="text-muted-foreground"
            onClick={() => setOpenedTaskId(undefined)}
            size={16}
          />
        </div>

        {isEditingTitle ? (
          <div className="space-y-2">
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <Button onClick={() => setIsEditingTitle(false)}>Save</Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <CardTitle className="text-2xl">{editedTitle}</CardTitle>
            <PencilSquareIcon
              className="size-6 flex-shrink-0"
              onClick={() => setIsEditingTitle(true)}
            />
          </div>
        )}

        <div className="flex items-center gap-2 text-sm mb-3">
          <CalendarClock size={16} />
          <p>{dateFormatter.format(new Date(task.dueDate ?? ""))}</p>
        </div>
        <Status status={task.status} />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <p className="font-bold">Description</p>
          <PencilSquareIcon
            className="size-6 flex-shrink-0"
            onClick={() => setIsEditingDescription(true)}
          />
        </div>
        {isEditingDescription ? (
          <div className="space-y-2">
            <Textarea
              autoResize={true}
              className="resize-none"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
            <Button onClick={() => setIsEditingDescription(false)}>Save</Button>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">{editedDescription}</p>
        )}
        <p className="font-bold">Detail</p>
        <div className="flex">
          <p className="font-semibold w-1/3">Assignee</p>
          <div className="flex gap-2.5">
            <UserCircleIcon className="size-6" />
            <p>{task.assignee ?? "Unassigned"}</p>
          </div>
        </div>
        <div className="flex">
          <p className="font-semibold w-1/3">Labels</p>
          <div className="flex gap-2.5">
            {task.labels.map((label) => (
              <Label label={label} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
