import { AddCircle } from "@mui/icons-material";
import useAutosizeTextArea from "../useAutosizeTextArea";
import { FormEvent, useRef, useState } from "react";

interface FormPropType {
  createTask: any;
}
const Form = (props: FormPropType) => {
  const { createTask } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const descriptionAreaRef = useRef<HTMLTextAreaElement>(null);
  const titleAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(titleAreaRef.current, title);
  useAutosizeTextArea(descriptionAreaRef.current, description);

  const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createTask(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={(e) => {HandleSubmit(e)}}
      className=" p-4 rounded-lg bg-gradient-to-l from-cyan-500 to-blue-500"
    >

      
      <div className="flex justify-between pb-2">
        <textarea
          ref={titleAreaRef}
          rows={1}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          // type="text"
          className="w-full text-xl rounded-lg p-[3px]"
        />
        <button type="submit" className="ml-2 rounded-lg text-gray-100 ">
          <AddCircle />
        </button>
      </div>
      <textarea
        ref={descriptionAreaRef}
        rows={1}
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="w-full text-xl rounded-lg p-[3px]"
      />
    </form>
  );
};

export default Form;
