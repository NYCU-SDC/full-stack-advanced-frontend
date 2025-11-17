type RefreshTokenResponse = {
  access_token: string;
  refresh_token: string;
};

export async function refreshToken(
  refreshToken: string
): Promise<RefreshTokenResponse> {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/api/refreshToken/${refreshToken}}`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}
