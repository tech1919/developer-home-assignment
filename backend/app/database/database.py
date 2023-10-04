import os
from logging import getLogger
from sqlmodel import SQLModel, create_engine, Session, sql, select
from app.database.models import tasks
from . import models

# create var for logging:
logger = getLogger(__name__)


# Connection details:
mySQLDatabaseUrl = os.environ.get("DATABASE_URL")
engine = create_engine(mySQLDatabaseUrl, echo=True)
''' Note: "echo = True" - will make the engine print all the SQL statements it executes,
which can help us understand what's happening. in Production it will be removed.. '''


# Create database and tables:
def init_db():
    SQLModel.metadata.create_all(engine)
    logger.info("Successful")


# Insert some trash rows to "tasks" db, just to see if other function are worked:
def insert_trash_details_to_db():
    row_1 = tasks(title="task 1", description="this is test for taks 1", completed=False)
    row_2 = tasks(title="task 2", description="this is test for taks 2", completed=False)
    row_3 = tasks(title="task 3", description="this is test for taks 3", completed=False)
    row_4 = tasks(task_id=None ,title="task 4", description="this is test for taks 4", completed=False)

    with Session(engine) as session:
        session.add(row_1)
        session.add(row_2)
        session.add(row_3)
        session.add(row_4)

        session.commit()


# Requierd Functions:
# Retrieve a list of all tasks:
def get_all_tasks():
    with Session(engine) as session:
        statement = select(tasks)
        results = session.exec(statement)
        list_of_tasks = results.all()
        return list_of_tasks

# Retrieve details of a specific task by its ID:
def get_task_by_id(taskId: int):
    with Session(engine) as session:
        statement = select(tasks).where(tasks.task_id == taskId)
        result = session.exec(statement).one()
        return result

# Create a new task:
def create_new_task(new_task: tasks):
    if new_task.task_id == None:
        task = tasks(title= new_task.title, description= new_task.description, completed= new_task.completed)
    else:
        task = tasks(task_id= new_task.task_id, title= new_task.title, description= new_task.description, completed= new_task.completed)

    with Session(engine) as session:
        session.add(task)

        session.commit()


# Update an existing task by its ID:
def update_task_by_id(taskId: int, task_update: tasks):
    result = get_task_by_id(taskId)
    with Session(engine) as session:
        result.title = task_update.title
        result.description = task_update.description
        result.completed = task_update.completed
        session.add(result)

        session.commit()
        session.refresh(result)
        
    return result

# Delete a task by its ID:
def delete_task_by_id(taskId: int):
    with Session(engine) as session:
        statement = select(tasks).where(tasks.task_id == taskId)
        result = session.exec(statement).one()
        
        session.delete(result)
        session.commit()
    
    
## Help function to check if task_id exist:
def is_task_id_exist(task_id):
    if task_id == None:
        return False
    
    with Session(engine) as session:
        statement = select(tasks).where(tasks.task_id == task_id)
        result = session.exec(statement).one()
    
    if result == None :
        return False
    
    return True
        

