import { Delete, ModeEdit } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import { TaskType } from "../types";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { useRef, useState } from "react";
import useAutosizeTextArea from "../useAutosizeTextArea";

interface TaskPropType {
  task: TaskType;
  deleteTask: (id: number) => void;
  updateTask: any;
  setCompleted: any;
  completed: boolean;
  display: boolean;
  displayAll: boolean;
}

interface Content {
  [key: string]: any;
}

const Task = (props: TaskPropType) => {
  const theme = createTheme({
    components: {
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
          },
          content: {
            display: "flex !important",
            justifyContent: "space-between  !important",
            alignItems: "center  !important",
            flexWrap: "wrap",
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            width: window.innerWidth > 768 ? "70%" : "180px",
            height: "auto",
            whiteSpace: "normal",
            overflowWrap: "break-word",
          },
        },
      },
    },
  });

  const { task, deleteTask, updateTask, completed, setCompleted, display, displayAll } = props;
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handeleDelete: any = (id: number) => {
    deleteTask(id);
  };
  const descriptionAreaRef = useRef<HTMLTextAreaElement>(null);
  const titleAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(titleAreaRef.current, newTitle);
  useAutosizeTextArea(descriptionAreaRef.current, newDescription);

  const toggleEditMode = () => {
    if (task.completed) {
      alert("To modify a completed task, simply uncheck and edit it.");
    } else {
      setEdit(!edit);
      setNewTitle(task.title);
      setNewDescription(task.description);
    }
  };

  const handeleEdit = () => {
    let content: Content = {};
    content["id"] = task.id;
    if (newTitle && newTitle !== task.title) {
      content["title"] = newTitle;
    }
    if (newDescription && newDescription !== task.description) {
      content["description"] = newDescription;
    }
    if (completed !== task.completed) {
      content["completed"] = completed;
    }
    updateTask(content);
    setEdit(false)
  };

  const handleCheck = () => {
    setCompleted(!completed);

    handeleEdit();
  };

  const handleBoxClick = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
  };

  const capitalize =(str: string): string =>{
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const backgroundColor = !task.completed
    ? " from-cyan-500 to-blue-500"
    : " from-gray-300 to-gray-500";

  return (
    <ThemeProvider theme={theme}>
      <div className="task" style={{display:displayAll?"block":(display?task.completed?"none":"block":!task.completed?"none":"block")}}>
        {!task.completed && edit ? (
          <div
            onSubmit={updateTask}
            className=" p-4 rounded-lg bg-gradient-to-l from-cyan-500 to-blue-500"
          >
            <div className="flex justify-between pb-2">
              <textarea
                ref={titleAreaRef}
                rows={1}
                onChange={(e) => setNewTitle(e.target.value)}
                value={newTitle}
                // type="text"
                className="w-full text-xl rounded-lg p-[3px]"
              />
              <button
                onClick={() => {
                  handeleEdit();
                }}
                className="ml-2 rounded-lg text-gray-100 "
              >
                <ModeEdit />
              </button>
              <button
                onClick={() => {
                  setEdit(false);
                }}
                className="ml-2 rounded-lg text-gray-100 "
              >
                <ClearIcon />
              </button>
            </div>
            <textarea
              ref={descriptionAreaRef}
              rows={1}
              onChange={(e) => setNewDescription(e.target.value)}
              value={newDescription}
              className="w-full text-xl rounded-lg p-[3px]"
            />
          </div>
        ) : (
          <Accordion
            className={`rounded-md shadow-md text-lg p-3 my-1 font-bold text-cyan-50 w-full bg-gradient-to-l  ${backgroundColor}`}
          >
            <AccordionSummary
              key={task.id}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="typography" sx={{}}>
                {" "}
                {capitalize(task.title)}
              </Typography>
              <Box className="flex gap-3 my-2" onClick={handleBoxClick}>
                <button
                  className="flex justify-between items-center align-middle "
                  onClick={() => {
                    toggleEditMode();
                  }}
                >
                  <ModeEdit />
                </button>
                <button
                  className="flex justify-between items-center align-middle "
                  onClick={() => {
                    handleCheck();
                  }}
                >
                  {task.completed ? (
                    <CheckBoxIcon />
                  ) : (
                    <CheckBoxOutlineBlankIcon />
                  )}
                </button>
                <button
                  className="flex justify-between items-center align-middle "
                  onClick={() => {
                    handeleDelete(task.id);
                  }}
                >
                  <Delete />
                </button>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{capitalize(task.description)}</Typography>
            </AccordionDetails>
          </Accordion>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Task;
