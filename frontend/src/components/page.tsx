// "use client";
// import {
//   useCallback,
//   useDebugValue,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";
// import AddTask from "./AddTask";
// import TaskList from "../components/TaskList/index";

// export default function Home() {
//   const [data, setData] =
//     useState<
//       { id: number; title: string; description: string; completed: boolean }[]
//     >();

//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {

 
//     updateData();
//   }, []);
//   const updateData = async () => {
//     await fetch("http://localhost:8080/api/tasks")
//       .then((res) => res.json())
//       .then((res) => setData(res));
//         console.log("data",data);

//   }
//   // console.log("data",data);

//   const addTask = async (task: {
//     id: number;
//     title: string;
//     description: string;
//     completed: boolean;
//   }) => {
//     await fetch("http://localhost:8080/api/tasks", {
//       method: "POST",
//       body: JSON.stringify({ task }),
//       headers: {
//         // 'Access-Control-Allow-Origin': '*',
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((res) => console.log(res));
//   };

//   const deleteTask = async (id: number) => {
//     await fetch("http://localhost:8080/api/tasks", {
//       method: "DELETE",
//       body: JSON.stringify({ id }),
//       headers: {
//         // 'Access-Control-Allow-Origin': '*',
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((res) => console.log(res));
//   };

//   return (
//     <main className=" max-w-4xl mx-auto mt-20">
//       <div className="text-center my-10 flex flex-col gap-4">
//         <h1 className="text-4xl font-bold mb-10">Task Manager</h1>
//         <AddTask addTask={addTask} />
//         {!isLoading &&
//           data?.map((task) => (
//             <div>
//               <TaskList deleteTask={deleteTask} task={task} />
//               {task.title}
//             </div>
//           ))}{" "}
//       </div>
//     </main>
//   );
// }
