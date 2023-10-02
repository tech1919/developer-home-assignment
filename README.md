
# Task Management Web Application

  

## Overview

This web application allows users to manage a list of tasks. It comprises three main components: a Flask API, a React frontend and a PostgreSQL database.



## Installation

1.  **Prerequisites**:

- Python (version 3.11.5)
-  PostgreSQL
- Node.js (version 14.18+)

2.  **Setup Steps**:

- Clone the repository: `git clone https://github.com/Nahums0/developer-home-assignment.git`

- Navigate to the directory: `cd developer-home-assignment`

- Install Python dependencies: `pip install -r backend/requirements.txt`

- Install Node dependencies: `cd frontend && npm install`

- Insert you database's uri string in the backend/.env file `DATABASE_URI={your db url}`

1. **Starting the services**
> Run commands from root directory
> 
- Running the backend: `cd backend && python run.py`
- Running the frontend: `cd frontend && npm run dev`

1.  **Access the App**:

- Visit `http://localhost:5173`

  

## Database Schema

 

### `tasks` Table

-  `id`: integer, Primary Key
- `owner`: integer, Foreign Key (task.owner <--> user.email)
-  `title`: string
-  `description`: String
-  `completed`: boolean
- `group_id`: integer, Foreign Key (task.group_id <--> group.id)
  
### `User` Table

-   `email`:  string, Primary Key
-   `password`: binary

### `Group` Table

-   `id`: integer, Primary Key
-   `owner`: string, Foreign Key (group.owner <--> user.email)
-   `title`: string 
-   `color`: string 


## API Endpoints

### `app/routes/users.py`:

-   **User Login**:
    
    -   Method: POST
    -   Endpoint: `/api/login`
    -   Description: Authenticates users based on their email and password. If the credentials are valid, an access token is returned.
-   **User Registration**:
    
    -   Method: POST
    -   Endpoint: `/api/register`
    -   Description: Registers new users, stores their email and a hashed version of their password. Returns an JWT access token upon successful registration.

### `app/routes/tasks.py`:

-   **Retrieve All Tasks for a User**:
    
    -   Method: GET
    -   Endpoint: `/api/`
    -   Description: Retrieves all tasks belonging to the authenticated user with custom sorting
-   **Retrieve a Specific Task by ID**:
    
    -   Method: GET
    -   Endpoint: `/api/<int:task_id>`
    -   Description: Retrieves a specific task belonging to the authenticated user

-   **Retrieve Tasks by Group ID**:
    
    -   Method: GET
    -   Endpoint: `/api/group/<int:group_id>`
    -   Description: Retrieves all tasks belonging to the authenticated user that have a specific group ID
-   **Retrieve Sorted Tasks**:
    
    -   Method: GET
    -   Endpoint: `/api/sort/<string:sort_by>`
    -   Description: Retrieves tasks sorted by the specified field for the authenticated user (title, description and completed)
-   **Create a New Task**:
    
    -   Method: POST
    -   Endpoint: `/api/`
    -   Description: Creates a new task for the authenticated user based on the provided title, description, and optional group ID
-   **Update an Existing Task**:
    
    -   Method: PUT
    -   Endpoint: `/api/<int:task_id>`
    -   Description: Updates given fields of an existing task 
-   **Delete a Task**:
    
    -   Method: DELETE
    -   Endpoint: `/api/<int:task_id>`
    -   Description: Deletes a specific task based on its ID, if the task belongs to the authenticated user
### `app/routes/groups.py`:

-   **Retrieve All Groups for a User**:
    
    -   Method: GET
    -   Endpoint: `/api/`
    -   Description: Retrieves all groups belonging to the authenticated user
-   **Create a New Group**:
    
    -   Method: POST
    -   Endpoint: `/api/`
    -   Description: Creates a new group for the user with a specified title

## Frontend Interface
Built with React, the frontend allows users to:

- Login / Register while caching the access_token as a session variable 
- View all tasks
- Add new tasks
- Sort tasks by title and is completed (ascending, descending)
- Edit task's title, description, selected and completion status
- Delete tasks
- Create groups
- Delete groups  

## Extras
1. The backend uses JWT for user authentication, requiring authentication to all endpoint related to user's data
2. The backend uses sqlalchemy for object relation mapping and alembic for database migrations
3. The backend an .env file to allow easily changeable settings
4. The frontend allows users to use server side sorting to sort his task by multiple fields
5. The fronted allows users to group tasks by color coded groups they created
6. The frontend was fully tested for functionality ensuring no bugs or unwanted behavior occurs 
