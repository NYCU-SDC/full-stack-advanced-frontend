import Header from "@/components/Header";
import { TaskTable } from "@/components/tasks/TaskTable.tsx";
import { tasks } from "@/mocks/tasks.ts";
import { useState } from "react";

function App() {
  const [currentTasks, setCurrentTasks] = useState(tasks);

  return (
    <main>
      <Header />
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
    </main>
  );
}

export default App;
