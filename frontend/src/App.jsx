import { useState, useEffect } from 'react';
import Card from './components/card';
import * as api from "./apiFunctions.js";


function createTask(task){
  return(
    <Card
      key = {task.task_id}
      task_id = {task.task_id}
      title = {task.title}
      description = {task.description}
      status = {task.completed}
    />
  );
}


function App() {
    const [tasks, setTasks] = useState([]);

    useEffect( () => {
        api.getAllTasks().then((res) => {
            console.log(res[0]);
            setTasks(res[0])
        } );
    }, []);

    return (
        <div>
            <h1>My Tasks</h1>
            {tasks.map(createTask)}
        </div>
    );
}

export default App;