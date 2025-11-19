export async function createTask(
  title: string,
  access_token: string
): Promise<void> {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/api/task`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({ title }),
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
}
