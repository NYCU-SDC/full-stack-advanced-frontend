import Header from "@/components/Header";
import TaskTable from "@/components/tasks/TaskTable.tsx";
// import { tasks } from "@/mocks/tasks.ts";
import { useEffect, useState } from "react";
import DetailCard from "@/components/tasks/DetailCard.tsx";
import type { Task } from "@/types/task.types.ts";
import { openTaskDetailContext } from "@/types/openTaskDetailContext.ts";
import { getAllTasks } from "./requests/getAllTasks";

function App() {
  // const [currentTasks, setCurrentTasks] = useState<Task[]>([]);
  const [openedTaskId, setOpenedTaskId] = useState<number | undefined>();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllTasks();
      setTasks(data);
    };
    fetchData();
  }, []);

  return (
    <main>
      <Header />
      <openTaskDetailContext.Provider value={{ openedTaskId, setOpenedTaskId }}>
        <div className="flex justify-center gap-4">
          <div
            className={`sm:max-w-4xl justify-self-center max-w-full transition-all duration-500 ${openedTaskId ? "hidden sm:block" : ""}`}
          >
            <TaskTable
              tasks={tasks}
              addTask={(title: string) =>
                setTasks((prev) => [
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
          <div
            className={`${openedTaskId ? "w-full sm:w-md" : "w-0"} transition-all duration-500 `}
          >
            {openedTaskId && (
              <DetailCard
                setOpenedTaskId={setOpenedTaskId}
                task={tasks.find((task) => task.id == openedTaskId) as Task}
              />
            )}
          </div>
        </div>
      </openTaskDetailContext.Provider>
    </main>
  );
}

export default App;
