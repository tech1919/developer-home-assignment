// import React, { useEffect, useState } from "react";
import { Check } from "@mui/icons-material";
import { Delete } from "@mui/icons-material";
import { TaskType } from "../types";

interface TaskPropType {
  task: TaskType;
  deleteTask: (id: number) => void;
  updateTask:(id: number)=>void;
}

const Task = (props: TaskPropType) => {
  // console.log("data", data.data);
  const { task, deleteTask,updateTask } = props;

  const backgroundColor = !task.completed
    ? " from-cyan-500 to-blue-500"
    : " from-gray-300 to-gray-500";
  return (
    <div
      className={`rounded-md shadow-md text-lg p-3 my-1 font-bold text-cyan-50 w-full bg-gradient-to-l  ${backgroundColor}`}
    >
      <div className="flex justify-between items-center align-middle ">
        <div key={task.id} className="">
          <div>{task.title}</div>
        </div>
        <div className="flex gap-3">
          <button onClick={()=>updateTask(task.id)}>
            <Check />
          </button>
          <button onClick={() => deleteTask(task.id)}>
            <Delete />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
