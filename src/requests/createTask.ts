export async function createTask(title: string): Promise<void> {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/api/tasks`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
}
