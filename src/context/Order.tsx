import React, { createContext, useState, useEffect, ReactNode } from "react";

interface Order {
  id: number;
}

interface OrderContextProps {
  children: ReactNode;
}

export const OrderContext = createContext<
  [Order[], React.Dispatch<React.SetStateAction<Order[]>>]
>([[], () => {}]);

const Order = ({ children }: OrderContextProps) => {
  const [order, setOrder] = useState<Order[]>([]);
  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_KEY;

  useEffect(() => {
    fetch(`${url}/order/list/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.error(res.status);
        if (res.status === 401) {
          localStorage.removeItem("token");
        } else {
          return res.json();
        }
      })

      .then((data) => setOrder(data || []))
      .catch((err) => console.log(err));
  }, []);

  return (
    <OrderContext.Provider value={[order, setOrder]}>
      {children}
    </OrderContext.Provider>
  );
};

export default Order;
