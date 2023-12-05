import React, { createContext, useState, useEffect, ReactNode } from "react";

interface Account {
  // Account maydonlarini ko'rsatish kerak
  id: number;
  username: string;
  // qo'shimcha maydonlar ...
}

interface AccountContextProps {
  children: ReactNode;
}

export const AccountContext = createContext<
  [Account[], React.Dispatch<React.SetStateAction<Account[]>>]
>([[], () => {}]);

const Accounts = ({ children }: AccountContextProps) => {
  const [accountList, setAccountList] = useState<Account[]>([]);
  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_KEY;

  useEffect(() => {
    fetch(`${url}/account/client/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          localStorage.removeItem("access");
          setAccountList(data || []);
        } else {
          localStorage.setItem("access", "true");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <AccountContext.Provider value={[accountList, setAccountList]}>
      {children}
    </AccountContext.Provider>
  );
};

export default Accounts;
