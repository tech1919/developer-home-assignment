import { AddCircle } from "@mui/icons-material/";

interface FormPropType {
  title: string;
  setTitle: (input: string) => void;
  description: string;
  setDescription: (input: string) => void;
  createTask: any;
}
const Form = (props: FormPropType) => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    createTask,
  } = props;

  return (
    <form
      onSubmit={createTask}
      className=" p-4 rounded-lg bg-gradient-to-l from-cyan-500 to-blue-500"
    >
      <div className="flex justify-between pb-2">
        <input
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          className="w-full h-auto text-xl rounded-lg p-[3px] resize-y"
        />
        <button type="submit" className="ml-2 rounded-lg text-gray-100">
          <AddCircle />
        </button>
      </div>
      <div>
        <input
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text"
          className="w-full text-xl rounded-lg p-[3px]"
        />
      </div>
    </form>
  );
};

export default Form;
