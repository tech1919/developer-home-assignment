import React from 'react';
import * as api from "../apiFunctions.js";



function Card(tasks) {
    
  return (
    <div className='card'>
        <div className='top'>
            <b className='task_id'>Task Id = {tasks.task_id}</b>
            <button className='button' type="button" onClick={
                function handleClick(){
                    api.deleteTaskById(tasks.task_id);
            }}>delete</button>
            <h2 className='title'>{tasks.title}</h2>
        </div>
        <div className='buttom'>
            <h3 className='description'>{tasks.description}</h3>
            <label>{tasks.completed}
            <input className='status' type='checkbox'></input>
            </label>
        </div>
         <br></br>
         <br></br>
    </div>
   
  );
}

export default Card;
