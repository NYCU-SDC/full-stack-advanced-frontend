import { createContext } from "react";

export const authContext = createContext<{
  isLoggedIn: () => boolean;
}>({
  isLoggedIn: () => false,
});
