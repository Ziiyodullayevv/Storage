import React, { createContext, useState, useEffect, ReactNode } from "react";

interface Storage {
  // Task maydonlarini ko'rsatish kerak
  id: number;
  spare: string;
  // qo'shimcha maydonlar ...
}

interface StorageContextProps {
  children: ReactNode;
}

export const StorageContext = createContext<
  [Storage[], React.Dispatch<React.SetStateAction<Storage[]>>]
>([[], () => {}]);

const Storages = ({ children }: StorageContextProps) => {
  const [storage, setStorage] = useState<Storage[]>([]);
  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_KEY;

  useEffect(() => {
    fetch(`${url}/storage/list_or_create/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          localStorage.removeItem("access");
          setStorage(data || []);
        } else {
          localStorage.setItem("access", "true");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <StorageContext.Provider value={[storage, setStorage]}>
      {children}
    </StorageContext.Provider>
  );
};

export default Storages;
