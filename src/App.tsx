import Header from "@/components/Header";
import TaskTable from "@/components/tasks/TaskTable.tsx";
import { tasks } from "@/mocks/tasks.ts";
import { useState } from "react";
import DetailCard from "@/components/tasks/DetailCard.tsx";
import type { Task } from "@/types/task.types.ts";
import { openTaskDetailContext } from "@/types/openTaskDetailContext.ts";

function App() {
  const [currentTasks, setCurrentTasks] = useState(tasks);
  const [openedTaskId, setOpenedTaskId] = useState<number | undefined>();

  return (
    <main>
      <Header />
      <openTaskDetailContext.Provider value={{ openedTaskId, setOpenedTaskId }}>
        <div className="flex justify-center">
          <div className="w-full max-w-4xl justify-self-center">
            <TaskTable
              tasks={currentTasks}
              addTask={(title: string) =>
                setCurrentTasks((prev) => [
                  ...prev,
                  {
                    id: prev.length + 1,
                    title,
                    description: "",
                    labels: [],
                    status: "INBOX",
                    dueDate: null,
                    assignee: null,
                  },
                ])
              }
            />
          </div>
          {openedTaskId && (
            <DetailCard
              setOpenedTaskId={setOpenedTaskId}
              task={tasks.find((task) => task.id == openedTaskId) as Task}
            />
          )}
        </div>
      </openTaskDetailContext.Provider>
    </main>
  );
}

export default App;
