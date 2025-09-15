import { type Task } from "@/types/task.types.ts";
import { Table, TableHeader, TableBody } from "@/components/ui/table.tsx";
import { TableBodyRow, TableHeadRow } from "@/components/tasks/TaskRow.tsx";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card.tsx";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input.tsx";
import DetailCard from "@/components/tasks/DetailCard.tsx";

export default function TaskTable({
  tasks,
  addTask,
}: {
  tasks: Task[];
  addTask: (title: string) => void;
}) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [openedTaskId, setOpenedTaskId] = useState<number>();

  return (
    <div className="flex">
      <Card className="w-full">
        <CardHeader className="hidden sm:block">
          <CardTitle className="text-2xl">Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableHeadRow />
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableBodyRow
                  task={task}
                  onClick={() =>
                    setOpenedTaskId(
                      openedTaskId === task.id ? undefined : task.id,
                    )
                  }
                  key={task.id}
                />
              ))}
            </TableBody>
          </Table>
          <form
            className="text-sm"
            onSubmit={(e) => {
              e.preventDefault();
              if (newTaskTitle !== "") {
                addTask(newTaskTitle);
                setNewTaskTitle("");
                setIsAddingTask(false);
              }
            }}
          >
            {isAddingTask ? (
              <Input
                autoFocus
                onBlur={() => setIsAddingTask(false)}
                value={newTaskTitle}
                onInput={(e) => setNewTaskTitle(e.currentTarget.value)}
                placeholder="What needs to be done?"
              />
            ) : (
              <div
                onClick={() => setIsAddingTask(true)}
                className="flex p-1 gap-2 items-center hover:bg-muted/50"
              >
                <Plus />
                <p>Create</p>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
      {openedTaskId && (
        <DetailCard
          setOpenedTaskId={setOpenedTaskId}
          task={tasks.find((task) => task.id == openedTaskId) as Task}
        />
      )}
    </div>
  );
}
