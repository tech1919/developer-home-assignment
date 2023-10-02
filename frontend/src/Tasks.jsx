import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import TaskModal from './TaskModal';
import NewTaskModal from './NewTaskModal';
import './Tasks.css';
import AppNavbar from './AppNavbar';


function Task({ task, onTaskClick, onDelete, onCheckboxChange, group }) {
    return (
        <div className="list-group-item d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
                <input className="mr-2" type="checkbox" checked={task.completed} onChange={() => onCheckboxChange(task)} />
                <span className="ml-2">{task.title}</span>
                {group && <span className="badge" style={{ backgroundColor: group.color, color: 'black' }}>{group.title}</span>}
            </div>
            <div>
                <Button variant="success" className="mr-2 open-button" onClick={() => onTaskClick(task)}>Open</Button>
                <Button variant="danger" onClick={() => onDelete(task)}>Delete</Button>
            </div>
        </div>
    );
}

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [groups, setGroups] = useState([]);
    const [showCreateTask, setShowCreateTask] = useState(false);
    const accessToken = sessionStorage.getItem('access_token');
    const [selectedTask, setSelectedTask] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [sortOption, setSortOption] = useState('Completed Asc');
    const apiHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    };

    const getGroupById = (groupId) => groups.find(group => group.id === groupId);

    const getSortOption = () => {
        const [sortBy, sortOrder] = sortOption.split(' ');
        return [sortBy.toLowerCase(), sortOrder === 'Asc' ? 'asc' : 'desc'];
    }

    useEffect(() => { fetchTasks(); }, [sortOption]);

    const fetchTasks = () => {
        const [sortBy, order] = getSortOption();

        fetch(`/api/tasks/?sort_by=${sortBy}&order=${order}`, { method: 'GET', headers: apiHeaders })
            .then(res => res.json())
            .then(data => setTasks(data.data));

        fetch("/api/groups/", { headers: apiHeaders })
            .then(res => res.json())
            .then(data => {
                var groups = data.data;
                if (groups == null) {
                    groups = []
                }
                console.log(groups)
                setGroups(groups)
            });
    }

    const handleTaskRequest = (task, method) => {
        const [sortBy, order] = getSortOption();

        fetch(`/api/tasks/${task.id || ''}`, {
            method: method,
            headers: apiHeaders,
            body: JSON.stringify({ ...task, sort_by: sortBy, order: order })
        })
        .then(res => res.json())
        .then(data => setTasks(data.data));
    }

    const handleTaskCompletion = (task) => {
        task.completed = !task.completed;
        handleTaskRequest(task, 'PUT');
    }

    const handleDeleteTask = (task) => handleTaskRequest(task, 'DELETE');

    const handleUpdateTask = (updatedTask) => handleTaskRequest(updatedTask, 'PUT');

    const handleCreateTask = (newTask) => handleTaskRequest(newTask, 'POST');

    const handleSortChange = (event) => setSortOption(event.target.value);

    if (sessionStorage['access_token'] === undefined) {
        window.location.href = '/';
    }

    return (
        <div className='todo-page bg-light'>
            <AppNavbar/>
            <div className="container mt-5 border rounded bg-white p-4">
                <h2 className="text-center mb-4">Tasks</h2>
                <div className="list-group">
                    {tasks != null && tasks.length > 0 && tasks.map(task => (
                        <Task
                            key={task.id}
                            task={task}
                            group={getGroupById(task.group_id)}
                            onCheckboxChange={handleTaskCompletion}
                            onTaskClick={(task) => {
                                setSelectedTask(task);
                                setShowEditModal(true);
                            }}
                            onDelete={handleDeleteTask}
                        />
                    ))}
                </div>
                <Button className="mt-3" variant="primary" onClick={() => setShowCreateTask(true)}>Create Task</Button>
                <div className='sort-container'>
                    <label className='sort-label'>Sort by:</label>
                    <Form.Control className='sort-selector' as="select" value={sortOption} onChange={handleSortChange}>
                        <option>Completed Asc</option>
                        <option>Completed Desc</option>
                        <option>Title Asc</option>
                        <option>Title Desc</option>
                    </Form.Control>
                </div>
            </div>
            {selectedTask &&
                <TaskModal
                    show={showEditModal}
                    task={selectedTask}
                    onHide={() => { setShowEditModal(false) }}
                    onUpdate={handleUpdateTask}
                    groups={groups}
                    group_id={selectedTask.group_id}
                />
            }
            <NewTaskModal
                show={showCreateTask}
                onHide={() => setShowCreateTask(false)}
                onTaskCreate={handleCreateTask}
                groups={groups}
            />
        </div>
    );
}
