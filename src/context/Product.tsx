import React, { createContext, useState, useEffect, ReactNode } from "react";

interface Product {
  // Product maydonlarini ko'rsatish kerak
  id: number;
  name: string;
  imei: string;
  client: number; // Agar client maydoni obyekt bo'lsa, uni ma'lumotlarini yuqorida ko'rsatish uchun interface yaratish mumkin
}

interface ProductContextProps {
  children: ReactNode;
}

export const ProductContext = createContext<
  [Product[], React.Dispatch<React.SetStateAction<Product[]>>]
>([[], () => {}]);

const Products = ({ children }: ProductContextProps) => {
  const [productList, setProductList] = useState<Product[]>([]);
  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_KEY;

  useEffect(() => {
    fetch(`${url}/product/device_list_or_create/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.error(res.status);
        if (res.status === 401) {
          localStorage.clear;
        } else {
          return res.json();
        }
      })
      .then((data) => setProductList(data)
        
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <ProductContext.Provider value={[productList, setProductList]}>
      {children}
    </ProductContext.Provider>
  );
};

export default Products;
