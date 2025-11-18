import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { refreshToken } from "@/requests/refreshToken";
import { authContext } from "@/lib/authContext";

type AccessTokenPayload = {
  exp: number;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "access_token",
    "refresh_token",
  ]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    () => !!cookies.access_token
  );

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

  // keep local state in sync when cookies change elsewhere
  useEffect(() => {
    setIsLoggedIn(!!cookies.access_token);
  }, [cookies.access_token]);

  // if there is access token in url, save it to cookie (run on mount)
  useEffect(() => {
    if (!window.location.href.includes("access_token=")) return;
    console.log("Found access_token in URL, saving to cookies.");
    const url = new URL(window.location.href);
    const token = url.searchParams.get("access_token");

    if (token) {
      setCookie("access_token", token, { path: "/" });
      url.searchParams.delete("access_token");
      window.history.replaceState({}, document.title, url.toString());
    }

    const refreshTok = url.searchParams.get("refresh_token");
    if (refreshTok) {
      setCookie("refresh_token", refreshTok, { path: "/" });
      url.searchParams.delete("refresh_token");
      window.history.replaceState({}, document.title, url.toString());
    }
  }, [setCookie]);

  const logout = () => {
    removeCookie("access_token", { path: "/" });
    removeCookie("refresh_token", { path: "/" });
  };

  return (
    <authContext.Provider value={{ isLoggedIn, logout }}>
      {children}
    </authContext.Provider>
  );
};
