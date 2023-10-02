import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function TaskModal({ task, show, onHide, onUpdate, groups }) {
    const [editedTask, setEditedTask] = useState(task);
    const [editing, setEditing] = useState(false);

    useEffect(() => setEditedTask(task), [task]);

    const handleInputChange = (key, value) => {
        setEditedTask(prevTask => ({ ...prevTask, [key]: value }));
    };

    const resetState = () => {
        setEditedTask(task);
        setEditing(false);
    }

    const handleSave = () => {
        onUpdate(editedTask);
        resetState();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header>
                <Modal.Title>
                    {editing ? 
                        <Form.Control 
                            value={editedTask.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                        /> 
                        : editedTask.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {editing ? 
                    <Form.Control 
                        as="textarea"
                        rows={3}
                        value={editedTask.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                    /> 
                    : <p>{editedTask.description}</p>}
                {groups.length > 0 ? groups.map(group => (
                    <span
                        key={group.id}
                        style={{
                            backgroundColor: group.color,
                            padding: '10px',
                            margin: '5px',
                            color: 'black',
                            cursor: editing ? 'pointer' : 'default'
                        }}
                        className={`${group.id === editedTask.group_id ? 'badge-selected' : 'badge'}`}
                        onClick={editing ? () => handleInputChange('group_id', group.id) : null}
                    >
                        {group.title}
                    </span>
                )):

                <div className="alert alert-warning" role="alert">
                No groups were created, go to the Groups view to create one
                </div>   
                }
            </Modal.Body>
            <Modal.Footer>
                {editing ?
                    <Button variant="success" onClick={handleSave}>Save</Button> :
                    <Button variant="info" onClick={() => setEditing(true)}>Edit</Button>
                }
                <Button variant="secondary" onClick={()=>{resetState();onHide()}}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}