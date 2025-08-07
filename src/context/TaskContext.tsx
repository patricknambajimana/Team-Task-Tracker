import { createContext, useEffect, useState, type ReactNode } from "react";
import type { ITask } from "../types/Task";

export const TaskContext = createContext<
  [ITask[], React.Dispatch<React.SetStateAction<ITask[]>>] | undefined
>(undefined);

type Props = {
  children: ReactNode;
};

export const TaskProvider = ({ children }: Props) => {
  const [tasks, setTasks] = useState<ITask[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider value={[tasks, setTasks]}>
      {children}
    </TaskContext.Provider>
  );
};
