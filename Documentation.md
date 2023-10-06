# Task Manager App Documentation

The Task Manager app is a web application designed to assist users in managing their tasks efficiently. The app has both backend and frontend components, utilizing technologies like Flask for the backend and React with Vite for the frontend.

Backend
The backend of the Task Manager app is built using Flask, a Python web framework. It provides a set of API endpoints to perform various operations on tasks, including creating, updating, deleting, and fetching tasks from a MySQL database.

Frontend
The frontend of the app is developed using React, a popular JavaScript library for building user interfaces, and Vite for an efficient build process. It provides a user-friendly interface for users to interact with the task management system. The frontend includes components for displaying tasks, adding new tasks, and managing existing tasks.

## Key Components

- **main.py**: Contains backend logic and defines API endpoints for task management.
- **db.py**: Manages database connections and table creation for tasks.
- **config.py**: Stores configuration variables for the app.

The frontend consists of several components, including:

- **App.tsx**: Defines the main component for routing and layout.
- **Home.tsx**: Represents the home page, displaying tasks and providing task management features.
- **Form.tsx**: Allows users to add new tasks.
- **Task.tsx**: Represents a single task, enabling task viewing, editing, and deletion.

## Supporting Files (Frontend)

- **types.ts**: Defines TypeScript types for structured task representation.
- **useAutosizeTextArea.ts**: Contains a custom hook for resizing text areas dynamically based on content.

## Dependencies

The app utilizes various dependencies, including Flask, React, Material-UI, and MySQL Connector Python for seamless functionality.

## Installation and Setup

### Backend

1. Navigate to the backend folder of the Task Manager app.
2. Install the required backend dependencies by running `pip install -r requirements.txt`.
3. Start the backend server by running `python main.py`.

### Frontend

1. Navigate to the frontend folder of the Task Manager app.
2. Install the required frontend dependencies by running `npm install`.
3. Start the frontend development server by running `npm run dev`.

Access the Task Manager app in your browser at `http://localhost:3000`.


This way, it's clear that the user needs to be in the appropriate folder (backend or frontend) before executing the installation commands.

## Usage

1. Open the Task Manager app in your web browser.
2. Create new tasks by filling in the title and description in the form provided on the main page.
3. View all tasks and perform actions such as editing, marking as completed, or deleting tasks.
4. Use the options provided to toggle between displaying all tasks or only incomplete tasks.
