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
import { useContext, useState } from "react";
import { Input } from "@/components/ui/input.tsx";
import { openTaskDetailContext } from "@/types/openTaskDetailContext.ts";
import { useTranslation } from "react-i18next";

export default function TaskTable({
  tasks,
  addTask,
}: {
  tasks: Task[];
  addTask: (title: string) => void;
}) {
  const { openedTaskId, setOpenedTaskId } = useContext(openTaskDetailContext);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader className="hidden sm:block">
        <CardTitle className="text-2xl">{t("task.tableTitle")}</CardTitle>
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
                    openedTaskId === task.id ? undefined : task.id
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
              placeholder={t("task.createPlaceholder")}
            />
          ) : (
            <div
              onClick={() => setIsAddingTask(true)}
              className="flex p-1 gap-2 items-center hover:bg-muted/50"
            >
              <Plus />
              <p>{t("task.create")}</p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
