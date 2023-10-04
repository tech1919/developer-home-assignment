import { useEffect, useState } from "react";
// import AddTask from "./components/AddTask";
import Form from "../../components/Form";
import Task from "../../components/Task";
import { TaskType } from "../../types";

const Home = () => {
  const [data, setData] = useState<TaskType[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [data]);

  const fetchData = async () => {
    await fetch("http://localhost:8080/api/tasks")
      .then((res) => res.json())
      .then((res) => setData(res));
  };

  //createTask
  const createTask = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    console.log(title);
    console.log(description);

    if (title === "" || description === "") {
      title === ""
        ? alert("Please enter title!")
        : alert("Please enter description!");
    } else {
      const task = { title, description };

      await fetch("http://localhost:8080/api/tasks", {
        method: "POST",
        body: JSON.stringify({ task }),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => console.log(res));
      setTitle("");
      setDescription("");
    }
  };

  //updatetask
  const updateTask = async (id:number) => {
    setCompleted(!completed)
    const task = {completed}
    await fetch(`http://localhost:8080/api/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify({task}),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
    setTitle("");
    setDescription("");
  };

  //deleteTask
  const deleteTask = async (id: number) => {
    await fetch(`http://localhost:8080/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  return (
    <div>
      <div className="bg-slate-200 max-w-[50%]  max-h-[90vh] min-h-min w-full m-auto rounded-md shadow-xl p-4 ">
        <h1 className="text-3xl font-bold text-center text-cyan-700 p-4">
          Task Manager
        </h1>
        <Form
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          createTask={createTask}
        />
        <div className="max-h-[65vh] overflow-y-scroll no-scrollbar my-2">
          {data?.map((el) => (
            <Task
              key={el.id}
              task={el}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
