// import React from "react";
import { createContext, useState } from "react";

export const SingleAccoutContext = createContext();

const SingleAccount = ({ children }) => {
  const [singleAccount, setSingleAccount] = useState(null);
  const token = localStorage.getItem("token");

  // Single Account:
  const handleSingleAccount = (id: number) => {
    console.log("account:", id);

    fetch(`http://127.0.0.1:8000/account/detail/update/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((account) => setSingleAccount(account || []))
      .catch((error) => {
        console.error("Fetch xatosi:", error);
      });
  };

  //
  return (
    <SingleAccoutContext.Provider value={[singleAccount, handleSingleAccount]}>
      {children}
    </SingleAccoutContext.Provider>
  );
};

export default SingleAccount;
