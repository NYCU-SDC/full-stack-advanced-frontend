import type { UserProfile } from "@/types/user.type";

export async function updateProfile(
  access_token: string,
  about: string
): Promise<UserProfile> {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/api/users`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({ about }),
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}
