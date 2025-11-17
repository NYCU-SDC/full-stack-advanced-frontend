import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { refreshToken } from "@/requests/refreshToken";

type AccessTokenPayload = {
  exp: number;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [cookies, setCookie] = useCookies(["access_token", "refresh_token"]);

  useEffect(() => {
    if (!cookies.access_token) return;

    // set refresh token timer
    const expireTime =
      jwtDecode<AccessTokenPayload>(cookies.access_token).exp * 1000 -
      Date.now() -
      60000; // 1 minute before expiration

    const refreshTimer = setTimeout(() => {
      const getNewToken = async () => {
        try {
          const data = await refreshToken(cookies.refresh_token);
          setCookie("access_token", data.access_token, { path: "/" });
          setCookie("refresh_token", data.refresh_token, { path: "/" });
        } catch (error) {
          console.error("Failed to refresh token:", error);
        }
      };
      getNewToken();
    }, expireTime);

    return () => clearTimeout(refreshTimer);
  }, [cookies.access_token, cookies.refresh_token, setCookie]);

  // if there is access token in url, save it to cookie
  if (window.location.href.includes("access_token=")) {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("access_token");
    if (token) {
      setCookie("access_token", token, { path: "/" });
      // remove token from url
      url.searchParams.delete("access_token");
      window.history.replaceState({}, document.title, url.toString());
    }

    const refreshToken = url.searchParams.get("refresh_token");
    if (refreshToken) {
      setCookie("refresh_token", refreshToken, { path: "/" });
      // remove refresh token from url
      url.searchParams.delete("refresh_token");
      window.history.replaceState({}, document.title, url.toString());
    }
  }

  return <>{children}</>;
};
