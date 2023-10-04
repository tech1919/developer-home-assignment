"use client";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
const AddTask = (addTask: any) => {
  const handleClick: any = () => {
    addTask.addTask({title: "task",description: "something to do", completed: false})
  };
  return (
    <div>
      <button
        onClick={(e) => handleClick()}
        className="btn bg-indigo-700 rounded-lg p-3 text-lg flex justify-center items-center align-middle font-bold text-cyan-50 w-full"
      >
        <div>Add new task</div>
        <AiOutlinePlus className="ml-1 text-white" size={10} />
      </button>
    </div>
  );
};

export default AddTask;
