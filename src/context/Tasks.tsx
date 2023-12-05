import React, { createContext, useState, useEffect, ReactNode } from "react";

interface Task {
  // Task maydonlarini ko'rsatish kerak
  id: number;
  // qo'shimcha maydonlar ...
}

interface TasksContextProps {
  children: ReactNode;
}

export const TasksContext = createContext<
  [Task[], React.Dispatch<React.SetStateAction<Task[]>>]
>([[], () => {}]);

const Tasks = ({ children }: TasksContextProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_KEY;

  useEffect(() => {
    fetch(`${url}/task/list/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          localStorage.removeItem("access");
          setTasks(data || []);
        } else {
          localStorage.setItem("access", "true");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <TasksContext.Provider value={[tasks, setTasks]}>
      {children}
    </TasksContext.Provider>
  );
};

export default Tasks;
