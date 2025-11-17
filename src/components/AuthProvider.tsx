import { useCookies } from "react-cookie";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [, setCookie] = useCookies(["access_token", "refresh_token"]);

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
