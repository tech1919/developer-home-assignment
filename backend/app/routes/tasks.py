from fastapi import APIRouter, Header, HTTPException
from app.database.database import *

## Fast Api calls:

router = APIRouter()


@router.get("")
@router.get("/")
async def getTasks():
    tasks_list = get_all_tasks()
    if len(tasks_list) == 0:
        raise HTTPException(
            status_code=404, detail="Task list are empty, please insert some tasks"
        )
    return tasks_list
    

@router.get("/{task_id}")
async def get_task_id(task_id: int):
    req_task = get_task_by_id(task_id)
    if req_task is None:
        raise HTTPException(
            status_code=404, detail="Task ID not found"
        )
    return req_task


@router.post("/", response_model=tasks)
async def create_task(new_tasks: tasks):
    if is_task_id_exist(new_tasks.task_id) == True:
        raise HTTPException(
            status_code=406, detail="Task ID is already exist"
        )
    
    create_new_task(new_tasks)
    return new_tasks


@router.put("/{task_id}")
async def update_task(task_id: int, obj_task:tasks):
    req_task = get_task_by_id(task_id)
    if req_task is None:
        raise HTTPException(
            status_code=404, detail= f"{task_id=} does not exist"
        )
    update_task_by_id(task_id, obj_task)
    return {"msg1:":"Task was updated"}


@router.delete("/{task_id}")
async def delete_task(task_id: int):
    req_task = get_task_by_id(task_id)
    if req_task is None:
        raise HTTPException(
            status_code=404, detail= f"{task_id=} does not exist"
        )
    delete_task_by_id(task_id)
    return {"msg":"Deleted!"}
