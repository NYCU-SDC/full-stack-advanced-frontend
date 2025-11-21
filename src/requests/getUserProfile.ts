import { type UserProfile } from "@/types/user.type";

export async function getUserProfile(
  access_token: string
): Promise<UserProfile> {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/api/user/me`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}
