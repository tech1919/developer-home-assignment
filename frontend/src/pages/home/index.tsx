import { useEffect, useState } from "react";
import Form from "../../components/Form";
import Task from "../../components/Task";
import { TaskType } from "../../types";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";

const Home = () => {
  const [data, setData] = useState<TaskType[]>([]);
  const [completed, setCompleted] = useState(false);
  const [display, setDisplay] = useState(true);
  const [displayAll, setDisplayAll] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/api/tasks");
      const newData = await response.json();
      setData(newData);
    };

    fetchData();
  }, [data]);

  //createTask
  const createTask = async (title: string, description: string) => {
    if (title === "" || description === "") {
      title === ""
        ? alert("Please enter title!")
        : alert("Please enter description!");
    } else {
      const task = { title, description };

      await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        body: JSON.stringify({ task }),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => console.log(res));
    }
  };

  //updatetask
  const updateTask = async (taskEdited: TaskType) => {
    const task = taskEdited;

    await fetch(`http://localhost:5000/api/tasks/${task.id}`, {
      method: "PUT",
      body: JSON.stringify({ task }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  //deleteTask
  const deleteTask = async (id: number) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
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
        <h1 className="text-3xl  font-bold text-center text-cyan-700 p-4">
          Task Manager
        </h1>
        <Form createTask={createTask} />
        <div className="mt-2 flex justify-between">
          {" "}
          <button className="align-bottom font-bold"  onClick={() => {setDisplayAll(!displayAll)}}>
            {"Show All Tasks"}
          </button>
          <button className="mx-2" onClick={() => {setDisplay(!display);setDisplayAll(false)}}>
            {display ? <CheckBoxOutlineBlank /> : <CheckBox />}
          </button>
          
        </div>

        <div className="max-h-[65vh] overflow-y-scroll no-scrollbar my-2">
          {data?.map((el) => (
            <Task
              key={el.id}
              task={el}
              display={display}
              displayAll={displayAll}
              deleteTask={deleteTask}
              updateTask={updateTask}
              completed={completed}
              setCompleted={setCompleted}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
