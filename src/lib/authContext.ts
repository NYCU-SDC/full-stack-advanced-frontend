import { createContext } from "react";

export const authContext = createContext<{
  isLoggedIn: boolean;
  logout: () => void;
}>({
  isLoggedIn: false,
  logout: () => {},
});
