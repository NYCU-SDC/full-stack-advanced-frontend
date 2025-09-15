import { createContext } from "react";

export const openTaskDetailContext = createContext<{
  openedTaskId: number | undefined;
  setOpenedTaskId: (id: number | undefined) => void;
}>({
  openedTaskId: undefined,
  setOpenedTaskId: () => {},
});
