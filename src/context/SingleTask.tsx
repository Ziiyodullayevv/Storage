// // import React from "react";
// import { createContext, useState } from "react";

// export const SingleTaskContext = createContext();

// const SingleTasks = ({ children }) => {
//   const [singleTask, setSingleTask] = useState({});
//   const token = localStorage.getItem("token");

//   // Single Account:
//   const handleSingleTask = (id: number) => {
//     console.log("task:", id);

//     fetch(`http://127.0.0.1:8000/task/list/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((task) => setSingleTask(task || []))
//       .catch((error) => {
//         console.error("Fetch xatosi:", error);
//       });
//   };

//   //
//   return (
//     <SingleTaskContext.Provider value={[singleTask, handleSingleTask]}>
//       {children}
//     </SingleTaskContext.Provider>
//   );
// };

// export default SingleTasks;
