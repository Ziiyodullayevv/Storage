import React, { createContext, useState, useEffect, ReactNode } from "react";

interface Spares {
  // Spares maydonlarini ko'rsatish kerak
  id: number;
  spare: string;
  // qo'shimcha maydonlar ...
}

interface SparesContextProps {
  children: ReactNode;
}

export const SparesContext = createContext<
  [Spares[], React.Dispatch<React.SetStateAction<Spares[]>>]
>([[], () => {}]);

const Spares = ({ children }: SparesContextProps) => {
  const [sparesList, setSparesList] = useState<Spares[]>([]);
  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_KEY;

  useEffect(() => {
    fetch(`${url}/product/spare_list_with_id`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          localStorage.removeItem("access");
          setSparesList(data || []);
        } else {
          localStorage.setItem("access", "true");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <SparesContext.Provider value={[sparesList, setSparesList]}>
      {children}
    </SparesContext.Provider>
  );
};

export default Spares;
