import type { Task } from "@/types/task.types";

export async function getAllTasks(): Promise<Task[]> {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/api/tasks`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}
