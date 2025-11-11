import type { Task } from "@/types/task.types";

export async function updateTask(id: number, task: Task): Promise<void> {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/api/task/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
}
