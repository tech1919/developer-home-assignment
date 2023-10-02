import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function NewTaskModal({ show, onHide, onTaskCreate, groups }) {
    const [newTask, setNewTask] = useState({ title: '', description: '', group_id: null });

    const handleInputChange = (key, value) => {
        setNewTask(prevTask => ({ ...prevTask, [key]: value }));
    };

    const resetForm = () => setNewTask({ title: '', description: '', group_id: null });

    const handleSubmit = () => {
        if (newTask.group_id === null) delete newTask.group_id;
        onTaskCreate(newTask);
        resetForm();
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header>
                <Modal.Title>Create New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                            type="text"
                            value={newTask.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3}
                            value={newTask.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Group</Form.Label>
                        <br />
                        {groups.length > 0 ? groups.map(group => (
                            <span
                                key={group.id}
                                style={{ backgroundColor: group.color, padding: '10px', margin: '5px', color: 'black', cursor: 'pointer' }}
                                className={`${group.id === newTask.group_id ? 'badge-selected' : 'badge'}`}
                                onClick={() => handleInputChange('group_id', group.id)}
                            >
                                {group.title}
                            </span>
                        ))
                        :
                        <div className="alert alert-warning" role="alert">
                        No groups were created, go to the Groups view to create one
                        </div>   
                        }
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>{resetForm();onHide()}}>Close</Button>
                <Button variant="primary" onClick={handleSubmit}>Create Task</Button>
            </Modal.Footer>
        </Modal>
    );
}
